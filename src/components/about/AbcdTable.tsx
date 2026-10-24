import { Fragment, useState } from 'react';
import { CIPHER_GRID, getGridPosition, getLetterValue } from '@/lib/cipher';

export default function AbcdTable() {
  const [activeLetter, setActiveLetter] = useState<string | null>('U');

  const letterInfo = activeLetter
    ? {
        letter: activeLetter,
        val: getLetterValue(activeLetter),
        pos: getGridPosition(activeLetter),
      }
    : null;

  return (
    <div className="relative max-w-xl mx-auto w-full">
      {/* Wood Depth Mat Underneath Parchment */}
      <div
        className="absolute -inset-2.5 sm:-inset-3.5 rounded-[28px] bg-gradient-to-b from-[#342319] via-[#2a1a14] to-[#1f140d] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-[#5C4033]/45 -rotate-[0.3deg]"
      />

      {/* Parchment Map Sheet */}
      <div className="relative rounded-2xl bg-[#FFFDF7] border-2 border-[#D8C7A5] p-6 sm:p-9 shadow-2xl overflow-hidden rotate-[0.3deg]">
        {/* Brass Corner Pins */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4A017] to-[#7A5408] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#7A5408]/60 z-20" />
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4A017] to-[#7A5408] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#7A5408]/60 z-20" />
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4A017] to-[#7A5408] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#7A5408]/60 z-20" />
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4A017] to-[#7A5408] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#7A5408]/60 z-20" />

        {/* Header inside parchment (no compass watermark, no Reference Matrix badge per Tasks 46 & 47) */}
        <div className="relative z-10 text-center mb-6">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
            5-Column Alphabet Grid
          </h3>
          <p className="text-xs text-ink-muted mt-1.5 max-w-sm mx-auto font-medium">
            Letters are organized into 5 continuous columns. Column 1 anchors 6 letters down to Z.
          </p>
        </div>

        {/* 5-Column Grid Display */}
        <div className="relative z-10 grid grid-cols-5 gap-2 sm:gap-3 max-w-md mx-auto text-center">
          {/* Column headers */}
          {[1, 2, 3, 4, 5].map((colNum) => (
            <div
              key={colNum}
              className="fit-ellipsis text-[10px] sm:text-[11px] font-black text-ink pb-1.5 uppercase tracking-wide sm:tracking-wider border-b-2 border-ink/20"
              title={`Column ${colNum}`}
            >
              Col {colNum}
            </div>
          ))}

          {/* Grid Rows */}
          {CIPHER_GRID.map((row, rIdx) => (
            <Fragment key={rIdx}>
              {row.map((char) => {
                const isSelected = activeLetter === char;
                return (
                  <button
                    key={char}
                    type="button"
                    onClick={() => setActiveLetter(char)}
                    onMouseEnter={() => setActiveLetter(char)}
                    className={`h-11 sm:h-13 rounded-xl flex flex-col items-center justify-center transition-all min-h-[44px] ${
                      isSelected
                        ? 'bg-[#D4A017] text-white shadow-md scale-105 border-2 border-[#8C640C]'
                        : 'bg-white hover:bg-[#FAF4E6] text-ink border border-ink/15 hover:border-encrypt shadow-2xs'
                    }`}
                  >
                    <span className="font-hand font-bold text-2xl sm:text-3xl leading-none">
                      {char}
                    </span>
                    <span className={`text-[9px] font-mono font-bold leading-none mt-0.5 ${isSelected ? 'text-white' : 'text-ink-muted'}`}>
                      #{getLetterValue(char)}
                    </span>
                  </button>
                );
              })}

              {/* Pad row 5 with architectural etched slots (not broken dashed holes) */}
              {rIdx === 5 &&
                [1, 2, 3, 4].map((padIdx) => (
                  <div
                    key={`pad-${padIdx}`}
                    className="h-11 sm:h-13 rounded-xl bg-ink/[0.03] border border-ink/[0.08] flex items-center justify-center text-ink/20 font-mono text-xs select-none pointer-events-none"
                    aria-hidden
                  >
                    <span className="text-[10px] tracking-widest opacity-40">·</span>
                  </div>
                ))}
            </Fragment>
          ))}
        </div>

        {/* Interactive inspection footer */}
        {letterInfo && (
          <div className="relative z-10 mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between text-xs text-ink-muted gap-2 font-mono bg-[#FAF6EE] p-3 rounded-xl border border-ink/5">
            <div>
              Selected: <strong className="text-ink font-bold font-sans text-sm">{letterInfo.letter}</strong> (Value #{letterInfo.val})
            </div>
            <div>
              Grid Position: <strong className="text-ink font-semibold">Row {letterInfo.pos.r + 1}, Col {letterInfo.pos.c + 1}</strong>
            </div>
          </div>
        )}
      </div>

      <div id="number-grid" className="relative max-w-xl mx-auto w-full mt-10 scroll-mt-24">
        <div className="relative rounded-2xl bg-[#FFFDF7] border-2 border-[#D8C7A5] p-6 sm:p-8 shadow-xl rotate-[-0.2deg]">
          <div className="text-center mb-5">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
              2×5 Number Grid
            </h3>
            <p className="text-xs text-ink-muted mt-1.5 font-medium max-w-sm mx-auto">
              Encrypt: right → down. Decrypt: up → left. Wraps at edges like the letter map.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto font-mono text-center">
            {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <div
                key={digit}
                className="h-11 rounded-xl flex items-center justify-center bg-white border border-ink/15 text-ink font-bold text-lg shadow-2xs"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
