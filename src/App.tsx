import { useState } from "react";
import { Github, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoSelect } from "./components/video-select";
import { PromptSelect } from "./components/prompt-select";
import { useCompletion } from "ai/react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { LanguageSelect } from "./components/language-select";

export function App() {
  const { t } = useTranslation();
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <LanguageSelect />

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {t("headerText")}
          </span>

          <Separator orientation="vertical" className="h-6" />

          <a href="https://github.com/danilo-formagio" target="_blank">
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder={t("aiPromptPlaceholder")}
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder={t("aiResultPlaceholder")}
              readOnly
              value={completion}
            />
          </div>

          <p>
            <Trans
              i18nKey="footerText"
              values={{ key: "transcription" }}
              components={[<code className="text-violet-400"></code>]}
            />
          </p>
        </div>

        <aside className="w-80 space-y-4">
          <VideoSelect onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>{t("promptTitle")}</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>{t("modelTitle")}</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                {t("modelTip")}
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>{t("temperatureTitle")}</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                {t("temperatureTip")}
              </span>

              <Button type="submit" disabled={isLoading} className="w-full">
                {t("submit")}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}
