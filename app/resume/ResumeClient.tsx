'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ResumeClient() {
    const [password, setPassword] = useState('');
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                const res = await fetch('/api/resume', {
                    body: JSON.stringify({ password }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                });

                if (!res.ok) {
                    const data = await res.json();
                    setError(data.error || 'Fehler bei der Authentifizierung');
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setContent(data.content);
            } catch {
                setError('Netzwerkfehler');
            } finally {
                setLoading(false);
            }
        },
        [password],
    );

    if (content) {
        return <ResumeView markdown={content} />;
    }

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <form
                className="flex w-full max-w-[260px] flex-col gap-3"
                onSubmit={handleSubmit}
            >
                <p className="text-muted-foreground mb-1 text-center text-sm">
                    Passwort eingeben
                </p>
                <Input
                    ref={inputRef}
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    value={password}
                />
                <Button disabled={loading || !password} type="submit">
                    {loading ? '…' : 'Weiter'}
                </Button>
                {error && (
                    <p className="text-destructive text-center text-sm">{error}</p>
                )}
            </form>
            <a
                className="text-muted-foreground mt-4 text-center text-xs underline underline-offset-2 transition-colors hover:text-foreground"
                href="mailto:contact@pertermann.de?subject=Passwort%20Anfrage%20f%C3%BCr%20Lebenslauf"
            >
                Passwort anfragen
            </a>
        </div>
    );
}

function isSafeHref(href: string): boolean {
    if (href.startsWith('/')) return true;

    try {
        const url = new URL(href);
        return ['http:', 'https:', 'mailto:'].includes(url.protocol);
    } catch {
        return false;
    }
}

function renderInline(text: string, keyPrefix: string) {
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
    const tokens = text.split(tokenRegex).filter(Boolean);

    return tokens.map((token, index) => {
        const key = `${keyPrefix}-${index}`;

        if (token.startsWith('**') && token.endsWith('**')) {
            return (
                <strong className="font-medium text-foreground" key={key}>
                    {token.slice(2, -2)}
                </strong>
            );
        }

        if (token.startsWith('`') && token.endsWith('`')) {
            return (
                <code className="rounded bg-muted px-1 py-0.5 text-[12px]" key={key}>
                    {token.slice(1, -1)}
                </code>
            );
        }

        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            const label = linkMatch[1];
            const href = linkMatch[2];

            if (!isSafeHref(href)) {
                return <span key={key}>{label}</span>;
            }

            const external = href.startsWith('http') || href.startsWith('mailto:');
            return (
                <Link
                    className="underline underline-offset-2 text-foreground hover:text-foreground/60 transition-colors"
                    href={href}
                    key={key}
                    rel={external ? 'noopener noreferrer' : undefined}
                    target={external ? '_blank' : undefined}
                >
                    {label}
                </Link>
            );
        }

        return <span key={key}>{token}</span>;
    });
}

function ResumeView({ markdown }: { markdown: string }) {
    const lines = markdown.split('\n');

    return (
        <div className="mx-auto w-full max-w-xl">
            <p className="text-muted-foreground mb-6 text-center font-mono text-xs">
                ssh resume.pertermann.de -p 2222
            </p>
            <div className="space-y-0.5 font-mono text-[13px] leading-relaxed">
                {lines.map((line, index) => {
                    const key = `line-${index}`;

                    if (line.startsWith('# ')) {
                        return (
                            <h1 className="text-[15px] font-semibold text-foreground" key={key}>
                                {renderInline(line.slice(2), key)}
                            </h1>
                        );
                    }

                    if (line.startsWith('## ')) {
                        return (
                            <h2
                                className="text-[13px] font-medium text-muted-foreground mt-6 mb-1 uppercase tracking-wide"
                                key={key}
                            >
                                {renderInline(line.slice(3), key)}
                            </h2>
                        );
                    }

                    if (line.startsWith('### ')) {
                        return (
                            <h3 className="text-[13px] font-medium text-foreground mt-3" key={key}>
                                {renderInline(line.slice(4), key)}
                            </h3>
                        );
                    }

                    if (/^-{3,}$/.test(line.trim())) {
                        return <hr className="border-border my-4" key={key} />;
                    }

                    if (/^ {2,}- /.test(line)) {
                        return (
                            <p className="text-muted-foreground ml-6" key={key}>
                                ◦ {renderInline(line.replace(/^ +- /, ''), key)}
                            </p>
                        );
                    }

                    if (/^- /.test(line)) {
                        return (
                            <p className="text-foreground/80 ml-3" key={key}>
                                • {renderInline(line.slice(2), key)}
                            </p>
                        );
                    }

                    if (line.trim() === '') {
                        return <div className="h-1" key={key} />;
                    }

                    return (
                        <p className="text-foreground/80" key={key}>
                            {renderInline(line, key)}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
