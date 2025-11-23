'use client';

import { useEffect, useMemo, useState } from 'react';

const VOLUS_PATTERN = [
  'V   V  OOO   L     U   U  SSS ',
  'V   V O   O  L     U   U S    ',
  'V   V O   O  L     U   U  SSS ',
  ' V V  O   O  L     U   U     S',
  '  V    OOO   LLLLL  UUU   SSS ',
] as const;

const GRID_PADDING = 5;
const CELL_SIZE = 18;

type FilledCell = {
  row: number;
  col: number;
  id: string;
};

export function VolusTetrisLoader() {
  const patternHeight = VOLUS_PATTERN.length;
  const patternWidth = VOLUS_PATTERN[0].length;
  const totalRows = patternHeight + GRID_PADDING;
  const rowOffset = totalRows - patternHeight;

  const dropSequence = useMemo(() => {
    const cells: { row: number; col: number; order: number }[] = [];
    let order = 0;

    for (let row = patternHeight - 1; row >= 0; row--) {
      for (let col = 0; col < patternWidth; col++) {
        if (VOLUS_PATTERN[row][col] !== ' ') {
          cells.push({ row: row + rowOffset, col, order });
          order += 1;
        }
      }
    }

    return cells;
  }, [patternHeight, patternWidth, rowOffset]);

  const [filledCells, setFilledCells] = useState<FilledCell[]>([]);

  useEffect(() => {
    if (!dropSequence.length) return;

    let index = 0;
    let timeout: NodeJS.Timeout;

    const dropNext = () => {
      const cell = dropSequence[index];
      if (!cell) {
        index = 0;
        timeout = setTimeout(dropNext, 120);
        return;
      }

      setFilledCells((prev) => {
        const key = `${cell.row}-${cell.col}`;
        if (prev.some((filled) => filled.id === key)) {
          return prev;
        }
        return [
          ...prev,
          {
            row: cell.row,
            col: cell.col,
            id: key,
          },
        ];
      });

      index += 1;

      if (index < dropSequence.length) {
        timeout = setTimeout(dropNext, 90);
      } else {
        timeout = setTimeout(() => {
          setFilledCells([]);
          index = 0;
          timeout = setTimeout(dropNext, 300);
        }, 1400);
      }
    };

    timeout = setTimeout(dropNext, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [dropSequence]);

  const filledLookup = useMemo(() => {
    const map = new Map<string, boolean>();
    filledCells.forEach((cell) => {
      map.set(`${cell.row}-${cell.col}`, true);
    });
    return map;
  }, [filledCells]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="border-2 border-white/10 bg-black/80 rounded-2xl p-3"
        style={{ width: patternWidth * CELL_SIZE + 16 }}
      >
        <div className="space-y-1">
          {Array.from({ length: totalRows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {Array.from({ length: patternWidth }).map((__, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isFilled = filledLookup.get(key);
                const isBaseRow = rowIndex < rowOffset;
                return (
                  <div
                    key={key}
                    className={`volus-cell ${
                      isFilled ? 'volus-cell--filled' : 'volus-cell--empty'
                    } ${isBaseRow ? 'opacity-40' : ''}`}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs tracking-[0.4em] uppercase text-gray-400">
        Aligning VOLUS intelligence
      </p>
      <style jsx>{`
        @keyframes volusDrop {
          0% {
            transform: translateY(-250%);
            opacity: 0;
          }
          70% {
            transform: translateY(8%);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .volus-cell {
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .volus-cell--filled {
          background: #f8fafc;
          animation: volusDrop 0.55s cubic-bezier(0.19, 1, 0.22, 1);
        }
        :global(.dark) .volus-cell--filled {
          background: #0a0a0a;
        }
      `}</style>
    </div>
  );
}
