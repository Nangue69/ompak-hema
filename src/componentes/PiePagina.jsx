import { useI18n } from '../i18n/I18nContext.jsx';

export default function PiePagina() {
  const { t } = useI18n();

  return (
    <footer className="pie-pagina">
      <p>{t('app.pie')}</p>
      <p className="pie-pagina__autor">{t('app.autor')}</p>
    </footer>
  );
}
