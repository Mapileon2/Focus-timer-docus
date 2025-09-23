import React, { useState, useEffect, useMemo } from 'react';
+import { cn } from '../../utils/design-system';
+import { ModernCard } from './ModernCard';
+import { ModernButton } from './ModernButton';
+import { GlassMorphismCard } from './GlassMorphismCard';
+import { AnimatedCounter } from './AnimatedCounter';
+import { StatusIndicator } from './StatusIndicator';
+import { Input } from '../ui/input';
+import { Badge } from '../ui/badge';
+import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
+import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
+import { Quote } from '../../types';
+
+interface EnhancedQuoteSystemProps {
+  quotes: Quote[];
+  onQuoteSelect: (quote: Quote) => void;
+  onQuoteGenerate: (vibe: string, count: number) => void;
+  onQuoteFavorite: (id: string) => void;
+  onQuoteDelete: (id: string) => void;
+  isGenerating?: boolean;
+  selectedQuote?: Quote | null;
+  sessionType?: 'work' | 'shortBreak' | 'longBreak';
+  className?: string;
+}
+
+export const EnhancedQuoteSystem: React.FC<EnhancedQuoteSystemProps> = ({
+  quotes,
+  onQuoteSelect,
+  onQuoteGenerate,
+  onQuoteFavorite,
+  onQuoteDelete,
+  isGenerating = false,
+  selectedQuote,
+  sessionType = 'work',
+  className
+}) => {
+  const [searchTerm, setSearchTerm] = useState('');
+  const [filterCategory, setFilterCategory] = useState('all');
+  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'favorites'>('recent');
+  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
+  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(new Set());
+
+  // Smart filtering and sorting
+  const filteredAndSortedQuotes = useMemo(() => {
+    let filtered = quotes;
+
+    // Search filter
+    if (searchTerm) {
+      const searchLower = searchTerm.toLowerCase();
+      filtered = filtered.filter(quote => 
+        quote.content.toLowerCase().includes(searchLower) ||
+        quote.author.toLowerCase().includes(searchLower) ||
+        quote.category?.toLowerCase().includes(searchLower)
+      );
+    }
+
+    // Category filter
+    if (filterCategory !== 'all') {
+      if (filterCategory === 'favorites') {
+        filtered = filtered.filter(quote => quote.isFavorite);
+      } else {
+        filtered = filtered.filter(quote => quote.category === filterCategory);
+      }
+    }
+
+    // Sort
+    switch (sortBy) {
+      case 'alphabetical':
+        filtered.sort((a, b) => a.content.localeCompare(b.content));
+        break;
+      case 'favorites':
+        filtered.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
+        break;
+      default: // recent
+        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
+    }
+
+    return filtered;
+  }, [quotes, searchTerm, filterCategory, sortBy]);
+
+  // Get unique categories
+  const categories = useMemo(() => {
+    const cats = new Set(quotes.map(q => q.category).filter(Boolean));
+    return ['all', 'favorites', ...Array.from(cats)];
+  }, [quotes]);
+
+  // AI generation vibes based on session type
+  const getSessionVibes = () => {
+    switch (sessionType) {
+      case 'work':
+        return ['productivity', 'focus', 'determination', 'achievement', 'persistence'];
+      case 'shortBreak':
+        return ['relaxation', 'mindfulness', 'peace', 'renewal', 'balance'];
+      case 'longBreak':
+        return ['inspiration', 'motivation', 'growth', 'reflection', 'wisdom'];
+      default:
+        return ['motivation', 'inspiration', 'success', 'happiness', 'growth'];
+    }
+  };
+
+  const handleBulkAction = (action: 'delete' | 'favorite' | 'export') => {
+    const selectedArray = Array.from(selectedQuotes);
+    
+    switch (action) {
+      case 'delete':
+        if (confirm(`Delete ${selectedArray.length} selected quotes?`)) {
+          selectedArray.forEach(id => onQuoteDelete(id));
+          setSelectedQuotes(new Set());
+        }
+        break;
+      case 'favorite':
+        selectedArray.forEach(id => onQuoteFavorite(id));
+        setSelectedQuotes(new Set());
+        break;
+      case 'export':
+        const selectedQuoteData = quotes.filter(q => selectedQuotes.has(q.id));
+        const exportData = JSON.stringify(selectedQuoteData, null, 2);
+        const blob = new Blob([exportData], { type: 'application/json' });
+        const url = URL.createObjectURL(blob);
+        const a = document.createElement('a');
+        a.href = url;
+        a.download = 'focus-smile-quotes.json';
+        a.click();
+        URL.revokeObjectURL(url);
+        setSelectedQuotes(new Set());
+        break;
+    }
+  };
+
+  return (
+    <div className={cn('space-y-6', className)}>
+      {/* Header with Stats */}
+      <div className="flex items-center justify-between">
+        <div>
+          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
+            Quote Collection
+          </h2>
+          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
+            <AnimatedCounter value={quotes.length} /> quotes • <AnimatedCounter value={quotes.filter(q => q.isFavorite).length} /> favorites
+          </p>
+        </div>
+        
+        <div className="flex items-center gap-2">
+          <Badge variant="outline" className="text-xs">
+            {filteredAndSortedQuotes.length} shown
+          </Badge>
+          <StatusIndicator
+            status={isGenerating ? 'active' : 'inactive'}
+            size="sm"
+            animated={isGenerating}
+            showLabel={true}
+            label={isGenerating ? 'Generating' : 'Ready'}
+          />
+        </div>
+      </div>
+
+      {/* Search and Filter Bar */}
+      <GlassMorphismCard className="p-4">
+        <div className="flex flex-col sm:flex-row gap-4">
+          {/* Search */}
+          <div className="flex-1">
+            <Input
+              placeholder="Search quotes, authors, or categories..."
+              value={searchTerm}
+              onChange={(e) => setSearchTerm(e.target.value)}
+              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
+            />
+          </div>
+          
+          {/* Category Filter */}
+          <Select value={filterCategory} onValueChange={setFilterCategory}>
+            <SelectTrigger className="w-full sm:w-48 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
+              <SelectValue placeholder="Category" />
+            </SelectTrigger>
+            <SelectContent>
+              {categories.map(category => (
+                <SelectItem key={category} value={category}>
+                  <div className="flex items-center gap-2">
+                    <span>
+                      {category === 'all' ? '📚' :
+                       category === 'favorites' ? '⭐' :
+                       category === 'productivity' ? '🎯' :
+                       category === 'motivation' ? '💪' :
+                       category === 'mindfulness' ? '🧘' :
+                       '💭'}
+                    </span>
+                    <span className="capitalize">{category}</span>
+                  </div>
+                </SelectItem>
+              ))}
+            </SelectContent>
+          </Select>
+          
+          {/* Sort */}
+          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
+            <SelectTrigger className="w-full sm:w-40 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
+              <SelectValue />
+            </SelectTrigger>
+            <SelectContent>
+              <SelectItem value="recent">📅 Recent</SelectItem>
+              <SelectItem value="alphabetical">🔤 A-Z</SelectItem>
+              <SelectItem value="favorites">⭐ Favorites</SelectItem>
+            </SelectContent>
+          </Select>
+          
+          {/* View Mode */}
+          <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-1">
+            <ModernButton
+              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
+              size="sm"
+              onClick={() => setViewMode('grid')}
+              className="w-8 h-8 p-0"
+            >
+              ⊞
+            </ModernButton>
+            <ModernButton
+              variant={viewMode === 'list' ? 'primary' : 'ghost'}
+              size="sm"
+              onClick={() => setViewMode('list')}
+              className="w-8 h-8 p-0"
+            >
+              ☰
+            </ModernButton>
+          </div>
+        </div>
+      </GlassMorphismCard>
+
+      {/* Bulk Actions */}
+      {selectedQuotes.size > 0 && (
+        <GlassMorphismCard className="p-4">
+          <div className="flex items-center justify-between">
+            <div className="flex items-center gap-3">
+              <Badge variant="secondary">
+                <AnimatedCounter value={selectedQuotes.size} /> selected
+              </Badge>
+              <ModernButton
+                variant="ghost"
+                size="sm"
+                onClick={() => setSelectedQuotes(new Set())}
+              >
+                Clear Selection
+              </ModernButton>
+            </div>
+            
+            <div className="flex items-center gap-2">
+              <ModernButton
+                variant="ghost"
+                size="sm"
+                onClick={() => handleBulkAction('favorite')}
+                icon={<span>⭐</span>}
+              >
+                Favorite
+              </ModernButton>
+              <ModernButton
+                variant="ghost"
+                size="sm"
+                onClick={() => handleBulkAction('export')}
+                icon={<span>📤</span>}
+              >
+                Export
+              </ModernButton>
+              <ModernButton
+                variant="ghost"
+                size="sm"
+                onClick={() => handleBulkAction('delete')}
+                icon={<span>🗑️</span>}
+                className="text-red-600 hover:text-red-700"
+              >
+                Delete
+              </ModernButton>
+            </div>
+          </div>
+        </GlassMorphismCard>
+      )}
+
+      {/* AI Generation Panel */}
+      <GlassMorphismCard className="p-6">
+        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
+          <span>🤖</span>
+          AI Quote Generator
+        </h3>
+        
+        <Tabs defaultValue="quick" className="w-full">
+          <TabsList className="grid w-full grid-cols-2 mb-4">
+            <TabsTrigger value="quick">Quick Generate</TabsTrigger>
+            <TabsTrigger value="custom">Custom Prompt</TabsTrigger>
+          </TabsList>
+          
+          <TabsContent value="quick" className="space-y-4">
+            <p className="text-sm text-slate-600 dark:text-slate-400">
+              Generate quotes perfect for your current session type
+            </p>
+            
+            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
+              {getSessionVibes().map((vibe) => (
+                <ModernButton
+                  key={vibe}
+                  variant="ghost"
+                  onClick={() => onQuoteGenerate(vibe, 3)}
+                  disabled={isGenerating}
+                  className="h-auto p-4 flex-col gap-2 hover:scale-105"
+                >
+                  <span className="text-lg">
+                    {vibe === 'productivity' ? '🎯' :
+                     vibe === 'focus' ? '🔍' :
+                     vibe === 'determination' ? '💪' :
+                     vibe === 'relaxation' ? '🧘' :
+                     vibe === 'mindfulness' ? '🌸' :
+                     vibe === 'inspiration' ? '✨' :
+                     '💭'}
+                  </span>
+                  <span className="text-xs capitalize font-medium">{vibe}</span>
+                </ModernButton>
+              ))}
+            </div>
+          </TabsContent>
+          
+          <TabsContent value="custom" className="space-y-4">
+            <div className="flex gap-3">
+              <Input
+                placeholder="Enter a theme or mood (e.g., 'overcoming challenges')"
+                className="flex-1"
+              />
+              <ModernButton
+                variant="primary"
+                onClick={() => onQuoteGenerate('custom', 3)}
+                disabled={isGenerating}
+                loading={isGenerating}
+              >
+                Generate
+              </ModernButton>
+            </div>
+          </TabsContent>
+        </Tabs>
+      </GlassMorphismCard>
+
+      {/* Quote Grid/List */}
+      <div className={cn(
+        'transition-all duration-300',
+        viewMode === 'grid' 
+          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
+          : 'space-y-3'
+      )}>
+        {filteredAndSortedQuotes.map((quote, index) => (
+          <ModernCard
+            key={quote.id}
+            variant="glass"
+            hover={true}
+            clickable={true}
+            onClick={() => onQuoteSelect(quote)}
+            className={cn(
+              'group cursor-pointer transition-all duration-300',
+              selectedQuote?.id === quote.id && 'ring-2 ring-blue-500 shadow-xl',
+              selectedQuotes.has(quote.id) && 'ring-2 ring-purple-500',
+              'hover:scale-105 hover:shadow-xl'
+            )}
+            style={{ animationDelay: `${index * 50}ms` }}
+          >
+            {/* Selection checkbox */}
+            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
+              <input
+                type="checkbox"
+                checked={selectedQuotes.has(quote.id)}
+                onChange={(e) => {
+                  e.stopPropagation();
+                  const newSelected = new Set(selectedQuotes);
+                  if (e.target.checked) {
+                    newSelected.add(quote.id);
+                  } else {
+                    newSelected.delete(quote.id);
+                  }
+                  setSelectedQuotes(newSelected);
+                }}
+                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600"
+              />
+            </div>
+
+            {/* Quote content */}
+            <div className="p-6 space-y-4">
+              <blockquote className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
+                <span className="text-2xl text-slate-400 dark:text-slate-600 font-serif">"</span>
+                {quote.content}
+                <span className="text-2xl text-slate-400 dark:text-slate-600 font-serif">"</span>
+              </blockquote>
+              
+              {quote.author && (
+                <cite className="block text-right text-sm font-semibold text-slate-600 dark:text-slate-400 not-italic">
+                  — {quote.author}
+                </cite>
+              )}
+              
+              {/* Metadata */}
+              <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
+                <div className="flex items-center gap-2">
+                  {quote.category && (
+                    <Badge variant="outline" className="text-xs">
+                      {quote.category}
+                    </Badge>
+                  )}
+                  <Badge 
+                    variant={quote.source === 'ai-generated' ? 'default' : 'secondary'}
+                    className="text-xs"
+                  >
+                    {quote.source === 'ai-generated' ? '🤖 AI' :
+                     quote.source === 'curated' ? '📚 Curated' :
+                     '✏️ Custom'}
+                  </Badge>
+                </div>
+                
+                {/* Action buttons */}
+                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
+                  <ModernButton
+                    variant="ghost"
+                    size="sm"
+                    onClick={(e) => {
+                      e.stopPropagation();
+                      onQuoteFavorite(quote.id);
+                    }}
+                    className="w-8 h-8 p-0 rounded-full"
+                    icon={
+                      <span className={cn(
+                        'text-lg transition-colors duration-200',
+                        quote.isFavorite ? 'text-yellow-500' : 'text-slate-400 hover:text-yellow-500'
+                      )}>
+                        {quote.isFavorite ? '⭐' : '☆'}
+                      </span>
+                    }
+                  />
+                  <ModernButton
+                    variant="ghost"
+                    size="sm"
+                    onClick={(e) => {
+                      e.stopPropagation();
+                      onQuoteDelete(quote.id);
+                    }}
+                    className="w-8 h-8 p-0 rounded-full"
+                    icon={<span className="text-lg text-slate-400 hover:text-red-500">🗑️</span>}
+                  />
+                </div>
+              </div>
+            </div>
+          </ModernCard>
+        ))}
+      </div>
+
+      {/* Empty State */}
+      {filteredAndSortedQuotes.length === 0 && (
+        <GlassMorphismCard className="p-12 text-center">
+          <div className="space-y-4">
+            <div className="text-6xl opacity-50">💭</div>
+            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
+              No quotes found
+            </h3>
+            <p className="text-sm text-slate-600 dark:text-slate-400">
+              {searchTerm || filterCategory !== 'all' 
+                ? 'Try adjusting your search or filter criteria'
+                : 'Generate some AI quotes to get started!'
+              }
+            </p>
+            {(!searchTerm && filterCategory === 'all') && (
+              <ModernButton
+                variant="primary"
+                onClick={() => onQuoteGenerate('motivation', 5)}
+                disabled={isGenerating}
+                loading={isGenerating}
+                className="mt-4"
+              >
+                Generate First Quotes
+              </ModernButton>
+            )}
+          </div>
+        </GlassMorphismCard>
+      )}
+    </div>
+  );
+};
+
+export default EnhancedQuoteSystem;
+