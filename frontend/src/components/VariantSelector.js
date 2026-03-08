import React from 'react';
import { Check } from 'lucide-react';
import variantService from '../services/variantService';

const VariantSelector = ({
  product,
  selectedOptions,
  onOptionChange,
  selectedVariant,
}) => {
  if (!product || !product.options || product.options.length === 0) {
    return null;
  }

  const options = variantService.getVariantOptions(product);

  return (
    <div className="space-y-6">
      {options.map(option => (
        <div key={option.id} className="space-y-3">

          {/* Option Label */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white uppercase tracking-wider">
              {option.name}
            </label>
            <span className="text-xs text-zinc-400">
              {selectedOptions.find(s => s.name === option.name)?.value || 'Select'}
            </span>
          </div>

          {/* Option Values Grid */}
          <div className="flex flex-wrap gap-3">
            {option.values.map(value => {

              const isSelected =
                selectedOptions.find(s => s.name === option.name)?.value === value;

              const availableValues = variantService.getAvailableValues(
                product,
                option.name,
                selectedOptions.filter(s => s.name !== option.name)
              );

              const isAvailable = availableValues.includes(value);

              const buttonClass =
                option.name.toLowerCase() === 'color'
                  ? 'color-button'
                  : 'text-button';

              return (
                <button
                  key={value}
                  onClick={() => {
                    if (isAvailable || isSelected) {
                      onOptionChange(option.name, value);
                    }
                  }}
                  disabled={!isAvailable && !isSelected}
                  className={`
                    relative px-4 py-2 rounded-lg font-semibold text-sm
                    transition-all duration-200 uppercase tracking-wide
                    ${buttonClass}
                    ${isSelected
                      ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950 bg-orange-500/20 border-orange-500'
                      : isAvailable
                      ? 'border-2 border-zinc-700 hover:border-orange-500 bg-zinc-900 hover:bg-orange-500/10 text-zinc-300 hover:text-white'
                      : 'border-2 border-zinc-800 bg-zinc-900/50 text-zinc-600 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  {value}

                  {isSelected && (
                    <Check className="w-4 h-4 ml-2 inline-block" />
                  )}

                </button>
              );
            })}
          </div>

          {/* Color Swatches */}
          {option.name.toLowerCase() === 'color' && (
            <div className="flex flex-wrap gap-3 mt-4">
              {option.values.map(value => (

                <button
                  key={`swatch-${value}`}
                  onClick={() => onOptionChange(option.name, value)}
                  title={value}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all
                    ${selectedOptions.find(s => s.name === option.name)?.value === value
                      ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950 border-orange-500'
                      : 'border-zinc-700 hover:border-orange-500'
                    }
                  `}
                  style={{
                    backgroundColor: getColorValue(value),
                  }}
                />

              ))}
            </div>
          )}

        </div>
      ))}

      {/* Stock Status */}
      {selectedVariant && (
        <div className="pt-4 border-t border-zinc-800">
          {variantService.isInStock(selectedVariant) ? (

            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              In Stock
            </div>

          ) : (

            <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              Out of Stock
            </div>

          )}
        </div>
      )}

    </div>
  );
};

/* Convert color names to HEX */

const getColorValue = (colorName) => {

  const colorMap = {
    black: '#000000',
    white: '#ffffff',
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    yellow: '#eab308',
    purple: '#a855f7',
    pink: '#ec4899',
    orange: '#f97316',
    gray: '#6b7280',
    gold: '#fbbf24',
    silver: '#d1d5db',
  };

  const lowerName = colorName.toLowerCase();

  return colorMap[lowerName] || '#6b7280';
};

export default VariantSelector;
