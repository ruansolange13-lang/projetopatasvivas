import { useEffect } from 'react';
import { DONATION_AMOUNTS, formatBRL } from '../data';
import { ShieldCheck, Lock } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  selectedAmount: number;
  onSelectAmount: (cents: number) => void;
  onClose: () => void;
  onProceedToPayment: (cents: number) => void;
}

export function DonationModal({
  isOpen,
  selectedAmount,
  onSelectAmount,
  onClose,
  onProceedToPayment,
}: DonationModalProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="donation-modal-overlay"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4 backdrop-blur-xs"
    >
      <div
        id="donation-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Apoio aos Animais Resgatados"
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card p-5 shadow-xl sm:rounded-3xl border border-border"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              Doação Segura PIX
            </span>
            <h2 className="mt-1 text-base font-extrabold tracking-tight text-foreground">
              ❤️ Apoio aos Animais Resgatados
            </h2>
          </div>
          <button
            id="close-donation-modal-btn"
            onClick={onClose}
            aria-label="Fechar"
            className="-mt-1 rounded-full px-2 py-1 text-lg leading-none text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Quanto você gostaria de contribuir para apoiar os animais?
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {DONATION_AMOUNTS.map((cents) => {
            const isSelected = selectedAmount === cents;
            return (
              <button
                key={cents}
                id={`modal-amount-btn-${cents}`}
                type="button"
                onClick={() => onSelectAmount(cents)}
                aria-pressed={isSelected}
                className={`rounded-xl border py-3.5 text-sm font-bold transition-all ${
                  isSelected
                    ? 'border-brand bg-brand text-brand-foreground shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-brand/60'
                }`}
              >
                {formatBRL(cents)}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Sua contribuição será destinada à alimentação, medicamentos e atendimento veterinário dos
          animais acolhidos pelo Patas Vivas.
        </p>

        {/* Security / Instant PIX Badge */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 p-2.5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <div className="text-[11px]">
              <span className="font-bold text-foreground">Pagamento Seguro via PIX</span>
              <p className="text-[10px] text-muted-foreground">Transferência direta e confirmação em tempo real</p>
            </div>
          </div>
          <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
        </div>

        <button
          id="proceed-donation-btn"
          type="button"
          onClick={() => onProceedToPayment(selectedAmount)}
          className="mt-4 w-full rounded-xl bg-brand py-4 text-sm font-bold uppercase tracking-wide text-brand-foreground transition-colors hover:bg-brand-strong shadow-sm"
        >
          QUERO AJUDAR COM {formatBRL(selectedAmount)} ❤️
        </button>
      </div>
    </div>
  );
}
