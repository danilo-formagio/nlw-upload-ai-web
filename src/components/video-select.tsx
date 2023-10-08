import { FormEvent, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { VideoInput } from './video-input';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/axios';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Input } from './ui/input';

type Status = 'waiting' | 'downloading' | 'converting' | 'uploading' | 'generating' | 'success';

interface VideoUploadProps {
  onVideoUploaded: (id: string) => void;
}

export function VideoSelect(props: VideoUploadProps) {
  const { t, i18n } = useTranslation();

  const [status, setStatus] = useState<Status>('waiting');
  const [videoFile, setVideoFile] = useState<File | Blob | null>(null);

  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const youtubeUrlRef = useRef<HTMLInputElement>(null);

  const statusMessages = {
    waiting: t('status.waiting'),
    downloading: t('status.downloading'),
    converting: t('status.converting'),
    uploading: t('status.uploading'),
    generating: t('status.generating'),
    success: t('status.success')
  };

  function isWaiting(): boolean {
    return status === 'waiting';
  }

  async function getVideoFile(): Promise<File | Blob | null> {
    const youtubeUrl = youtubeUrlRef.current?.value;

    if (youtubeUrl) {
      const delimiter = youtubeUrl.includes('shorts') ? '/shorts/' : 'v=';
      const [_, params] = youtubeUrl.split(delimiter);
      const videoId = params.slice(0, 11);

      setStatus('downloading');

      const response = await api.get(`/download/${videoId}`, {
        responseType: 'blob'
      });

      return response.data;
    }

    return videoFile;
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;
    const videoData = await getVideoFile();
    if (!videoData) {
      return;
    }

    setStatus('converting');

    const audioFile = await convertVideoToAudio(videoData);
    const data = new FormData();
    data.append('file', audioFile);

    setStatus('uploading');

    const response = await api.post('/videos', data);
    const videoId = response.data.video.id;

    setStatus('generating');

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
      language: i18n.resolvedLanguage
    });

    setStatus('success');

    props.onVideoUploaded(videoId);
  }

  async function convertVideoToAudio(video: File | Blob) {
    console.log('Convert started.');

    const ffmpeg = await getFFmpeg();
    await ffmpeg.writeFile('input.mp4', await fetchFile(video));

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // });

    ffmpeg.on('progress', progress => {
      console.log(`Convert progress: ${Math.round(progress.progress * 100)}`);
    });

    await ffmpeg.exec(['-i', 'input.mp4', '-map', '0:a', '-b:a', '20k', '-acodec', 'libmp3lame', 'output.mp3']);

    const data = await ffmpeg.readFile('output.mp3');
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg'
    });

    console.log('Convert finished.');

    return audioFile;
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-4">
      <Tabs defaultValue="upload" className="flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" disabled={!isWaiting()}>
            Upload
          </TabsTrigger>
          <TabsTrigger value="youtube" disabled={!isWaiting()}>
            Youtube
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <VideoInput onVideoSelected={setVideoFile} />
        </TabsContent>
        <TabsContent value="youtube">
          <Input ref={youtubeUrlRef} type="text" placeholder="Youtube URL" />
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">{t('transcriptionPromptTitle')}</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          disabled={status !== 'waiting'}
          className="h-20 leading-relaxed resize-none"
          placeholder={t('transcriptionPromptPlaceholder')}
        />
      </div>

      <Button
        type="submit"
        data-success={status === 'success'}
        disabled={status !== 'waiting'}
        className="w-full data-[success=true]:bg-emerald-400"
      >
        {isWaiting() ? (
          <>
            {t('videoSubmit')}
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
