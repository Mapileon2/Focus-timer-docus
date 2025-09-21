import React, { useState } from 'react';
import { Quote } from '../types';
import { useQuotes } from '../hooks/useQuotes';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import StarFilledIcon from './icons/StarFilledIcon';
import StarOutlineIcon from './icons/StarOutlineIcon';
import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';
import CancelIcon from './icons/CancelIcon';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const { toggleFavorite, deleteQuote, updateQuote, toggleQuoteSelection, selectedQuoteIds } = useQuotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(quote.text);
  const [editedAuthor, setEditedAuthor] = useState(quote.author);
  const [editedCategory, setEditedCategory] = useState(quote.category || '');

  const isSelected = selectedQuoteIds.has(quote.id);

  const handleSave = () => {
    if (editedText.trim() && editedAuthor.trim()) {
      updateQuote(quote.id, editedText, editedAuthor, editedCategory);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditedText(quote.text);
    setEditedAuthor(quote.author);
    setEditedCategory(quote.category || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      deleteQuote(quote.id);
    }
  };

  const handleCheckboxChange = () => {
    toggleQuoteSelection(quote.id);
  };

  const getSourceBadge = (source: Quote['source']) => {
    switch (source) {
      case 'ai-generated': return { label: 'AI', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300', emoji: '🤖' };
      case 'curated': return { label: 'Curated', color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300', emoji: '📚' };
      case 'user': return { label: 'Custom', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300', emoji: '✏️' };
      case 'favorite': return { label: 'Favorite', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', emoji: '⭐' };
      default: return { label: 'Quote', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', emoji: '💭' };
    }
  };

  const sourceBadge = getSourceBadge(quote.source);

  return (
    <Card className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 transition-all duration-200 hover:shadow-md group ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
            aria-label={`Select quote: ${quote.text}`}
          />
          
          <div className="flex-grow space-y-4">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  rows={3}
                  placeholder="Enter quote text..."
                />
                <input
                  type="text"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Author name"
                />
                <input
                  type="text"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  placeholder="Category (optional)"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            ) : (
              <>
                <div className="relative">
                  <blockquote className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 font-medium">
                    "{quote.text}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sourceBadge.color}`}>
                      <span>{sourceBadge.emoji}</span>
                      {sourceBadge.label}
                    </span>
                    {quote.category && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 capitalize">
                        {quote.category}
                      </span>
                    )}
                  </div>
                  <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                    — {quote.author}
                  </cite>
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {isEditing ? (
              <>
                <Button 
                  onClick={handleSave} 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400" 
                  aria-label="Save changes"
                >
                  <SaveIcon className="w-4 h-4"/>
                </Button>
                <Button 
                  onClick={handleCancel} 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800" 
                  aria-label="Cancel editing"
                >
                  <CancelIcon className="w-4 h-4"/>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => toggleFavorite(quote.id)} 
                  size="sm" 
                  variant="ghost" 
                  className={`h-8 w-8 p-0 transition-colors ${
                    quote.isFavorite 
                      ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20' 
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                  }`}
                  aria-label={quote.isFavorite ? 'Unfavorite' : 'Favorite'}
                >
                  {quote.isFavorite ? <StarFilledIcon className="w-4 h-4"/> : <StarOutlineIcon className="w-4 h-4"/>}
                </Button>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400" 
                  aria-label="Edit quote"
                >
                  <EditIcon className="w-4 h-4"/>
                </Button>
                <Button 
                  onClick={handleDelete} 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400" 
                  aria-label="Delete quote"
                >
                  <TrashIcon className="w-4 h-4"/>
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;