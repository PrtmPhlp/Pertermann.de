'use client';

import { GitHubLogo, TwitterLogo } from './Icons';
import { actions } from '@/data/cmd';
import { cn } from '@/lib/className';
import {
  HomeIcon,
  MoonIcon,
  PencilIcon,
  PlusIcon,
  ScaleIcon,
  SunIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function RollingMenu() {
  const [expanded, setExpanded] = useState(false);
  const ref =
    useRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>();
  const scale = useMotionValue(1);
  const { resolvedTheme, setTheme } = useTheme();

  const memoizedActions = actions.filter((action) => {
    if (action.section === 'Themes') {
      return action.keywords !== resolvedTheme;
    }
    return true;
  });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const changeTheme = (theme: string) => {
    if (theme === 'light') {
      setTheme('light');
    } else if (theme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, rotate: -360, scale: 0.5, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        bounce: 0.5,
        damping: 10,
        delay: i * 0.05,
        type: 'spring',
      },
      x: 0,
    }),
  };

  useEffect(() => {
    if (!expanded) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(false);
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if ((ref.current as any)?.contains(target)) return;

      setExpanded(false);
    };

    const scrolled = () => {
      setExpanded(false);
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', scrolled);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('scroll', scrolled);
    };
  }, [expanded]);

  return (
    <div className="flex items-center" ref={ref as any}>
      <motion.button
        animate={{ rotate: expanded ? 45 : 0, scale: scale.get() }}
        className="h-10 w-10 select-none items-center rounded-full bg-black p-3 dark:bg-white"
        onClick={handleClick}
        whileTap={{ scale: 1.1 }}
      >
        <PlusIcon className="h-6 w-6 text-white dark:text-black" />
      </motion.button>
      <AnimatePresence>
        {expanded && (
          <motion.div className="flex space-x-2" layout>
            {memoizedActions.map((action, i) => (
              <motion.div
                animate="visible"
                className="mx-0.5"
                custom={i}
                exit="hidden"
                initial="hidden"
                key={i}
                tabIndex={-1}
                transition={{ bounce: 0.5, damping: 10, type: 'spring' }}
                variants={itemVariants}
                whileTap={{ scale: 1.1 }}
              >
                <Comp
                  as={
                    action.section === 'Navigation'
                      ? Link
                      : action.section === 'Socials'
                      ? 'a'
                      : 'button'
                  }
                  className={cn(
                    'flex h-10 w-10 cursor-pointer select-none flex-col items-center space-y-1 p-3 transition-all duration-200',
                    'rounded-full',
                    `bg-[${action.color}]`,
                  )}
                  href={action.href ?? undefined}
                  key={i}
                  onClick={
                    action.perform ?? action.section === 'Themes'
                      ? () => changeTheme(action.keywords!)
                      : undefined
                  }
                  tabindex={0}
                >
                  {action.keywords === 'home' && (
                    <HomeIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'writing' && (
                    <PencilIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'github' && (
                    <GitHubLogo
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'twitter' && (
                    <TwitterLogo
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'light' && (
                    <SunIcon className={`h-6 w-6 text-[${action.iconColor}]`} />
                  )}
                  {action.keywords === 'dark' && (
                    <MoonIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'system' && (
                    <ScaleIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                </Comp>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Comp({
  as,
  children,
  ...props
}: {
  [key: string]: any;
  as: any;
  children: React.ReactNode;
}): JSX.Element {
  const Component = as;
  return <Component {...props}>{children}</Component>;
}
