import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTranslation } from 'react-i18next';

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  function handleLanguageSelected(languageKey: string) {
    i18n.changeLanguage(languageKey);
  }

  return (
    <form className="flex items-center gap-3">
      <Label>{t('languagePlaceholder')}</Label>
      <Select defaultValue={i18n.language} onValueChange={handleLanguageSelected}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder={t('languagePlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="en" value="en">
            English
          </SelectItem>
          <SelectItem key="pt" value="pt">
            Português
          </SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
}
