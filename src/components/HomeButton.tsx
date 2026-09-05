import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/useLanguage';

const label = {
  id: 'Beranda',
  en: 'Home',
};

export function HomeButton() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      onClick={() => navigate('/explore')}
      aria-label={label[language]}
      className={
        'inline-flex min-h-[56px] min-w-[56px] items-center gap-1 rounded-xl px-3 ' +
        'text-sm font-medium text-[var(--color-text-main)] ' +
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        'focus-visible:outline-[var(--color-forest)] select-none cursor-pointer'
      }
    >
      <Home size={22} aria-hidden="true" />
      <span>{label[language]}</span>
    </motion.button>
  );
}
