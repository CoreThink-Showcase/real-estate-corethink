import { useState } from 'react';
import { Message, Property } from '@/lib/mockData';
import { mockMessages, mockProperties } from '@/lib/mockData';
import { ChatPanel } from './ChatPanel';
import { ComparisonView } from './ComparisonView';
import { PropertyCard } from './PropertyCard';
import { Button } from '@/components/ui/button';
import { Home, GitCompare } from 'lucide-react';

export function Dashboard() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'compare'>('chat');

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're interested in "${content}". Based on your preferences, I'd recommend focusing on properties with good school ratings and reasonable commute times. Would you like me to highlight specific features that matter most to you?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 2) {
        return [prev[1] as Property, property];
      }
      return [...prev, property];
    });
  };

  const latestProperties = messages
    .filter((m) => m.properties && m.properties.length > 0)
    .slice(-1)[0]?.properties || [];

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Chat */}
      <div className="w-full lg:w-[450px] flex-shrink-0 border-r flex flex-col">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

      {/* Right Panel - Properties & Comparison */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 border-b px-6 py-4 bg-background">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Property Explorer</h1>
              <p className="text-sm text-muted-foreground">
                Browse and compare real estate listings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('chat')}
              >
                <Home className="w-4 h-4 mr-2" />
                Properties
              </Button>
              <Button
                variant={activeTab === 'compare' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('compare')}
                disabled={selectedProperties.length < 2}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare ({selectedProperties.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'chat' ? (
            <div className="space-y-6">
              {/* Latest Properties from Chat */}
              {latestProperties.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Latest Recommendations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {latestProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSelect={() => handlePropertySelect(property)}
                        isSelected={selectedProperties.some((p) => p.id === property.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Properties */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  All Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={() => handlePropertySelect(property)}
                      isSelected={selectedProperties.some((p) => p.id === property.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ComparisonView properties={selectedProperties} />
          )}
        </div>
      </div>
    </div>
  );
}