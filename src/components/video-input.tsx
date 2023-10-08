import { FileVideo } from 'lucide-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface VideoInputProps {
  onVideoSelected: (file: File | null) => void;
}

export function VideoInput(props: VideoInputProps) {
  const { t } = useTranslation();
  const [videoFile, setVideoFile] = useState<File | null>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
    props.onVideoSelected(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <>
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className="pointer-events-none max-h-full inset-0" />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            {t('videoSelect')}
          </>
        )}
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />
    </>
  );
}
