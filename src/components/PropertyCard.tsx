import { Property, formatPrice, formatSqft } from '@/lib/mockData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Maximize, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function PropertyCard({ property, onSelect, isSelected }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      onClick={onSelect}
    >
      {/* Image Gallery */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {property.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
            {formatPrice(property.price)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Title and Address */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-1">{property.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.address}, {property.city}, {property.state}</span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Bed className="w-5 h-5 text-primary mb-1" />
            <span className="text-sm font-semibold">{property.beds}</span>
            <span className="text-xs text-muted-foreground">beds</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Bath className="w-5 h-5 text-primary mb-1" />
            <span className="text-sm font-semibold">{property.baths}</span>
            <span className="text-xs text-muted-foreground">baths</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Maximize className="w-5 h-5 text-primary mb-1" />
            <span className="text-sm font-semibold">{formatSqft(property.sqft)}</span>
            <span className="text-xs text-muted-foreground">sqft</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Calendar className="w-5 h-5 text-primary mb-1" />
            <span className="text-sm font-semibold">{property.yearBuilt}</span>
            <span className="text-xs text-muted-foreground">built</span>
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-semibold text-foreground">Key Tradeoffs</h4>
          <div className="flex flex-wrap gap-2">
            {property.tradeoffs.slice(0, 3).map((tradeoff, index) => (
              <Badge
                key={index}
                variant={
                  tradeoff.type === 'positive'
                    ? 'success'
                    : tradeoff.type === 'negative'
                    ? 'warning'
                    : 'outline'
                }
                className="text-xs"
              >
                {tradeoff.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {property.commuteTime && (
              <div className="flex items-center text-muted-foreground">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{property.commuteTime} min</span>
              </div>
            )}
            {property.schoolRating && (
              <div className="flex items-center text-muted-foreground">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Rating {property.schoolRating}/10</span>
              </div>
            )}
          </div>
          {property.walkScore && (
            <div className="flex items-center text-muted-foreground">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Walk {property.walkScore}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button variant="outline" className="w-full" onClick={(e) => e.stopPropagation()}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}