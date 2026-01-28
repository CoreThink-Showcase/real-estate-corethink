import { Property, formatPrice, formatSqft } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize, Calendar, MapPin, Clock, BookOpen, Zap } from 'lucide-react';

interface ComparisonViewProps {
  properties: Property[];
}

export function ComparisonView({ properties }: ComparisonViewProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No properties to compare</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Select properties from the chat to compare them side by side.
        </p>
      </div>
    );
  }

  const renderComparisonRow = (
    label: string,
    icon: React.ReactNode,
    getValue: (prop: Property) => string | number,
    highlightDiff?: boolean
  ) => {
    const values = properties.map(getValue);
    const firstValue = values[0];
    const allSame = values.every((v) => v === firstValue);

    return (
      <div className="grid grid-cols-[200px_1fr] gap-4 py-3 border-b last:border-0">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon}
          <span>{label}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {properties.map((property, index) => {
            const value = getValue(property);
            const isDifferent = !allSame && highlightDiff;
            const isFirstBetter = index === 0 && isDifferent;
            const isSecondBetter = index === 1 && isDifferent && properties.length === 2;

            return (
              <div
                key={property.id}
                className={`text-sm ${
                  isFirstBetter || isSecondBetter ? 'font-semibold text-primary' : 'text-foreground'
                }`}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Property Comparison</h2>
        <p className="text-sm text-muted-foreground">
          Comparing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </p>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                  {formatPrice(property.price)}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{property.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.address}, {property.city}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Bed className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-semibold">{property.beds}</div>
                  <div className="text-xs text-muted-foreground">beds</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Bath className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-semibold">{property.baths}</div>
                  <div className="text-xs text-muted-foreground">baths</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Maximize className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-semibold">{formatSqft(property.sqft)}</div>
                  <div className="text-xs text-muted-foreground">sqft</div>
                </div>
              </div>

              {/* Tradeoffs */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Key Tradeoffs</h4>
                <div className="flex flex-wrap gap-2">
                  {property.tradeoffs.map((tradeoff, index) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {renderComparisonRow(
              'Price',
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
              (prop) => formatPrice(prop.price),
              true
            )}
            {renderComparisonRow(
              'Bedrooms',
              <Bed className="w-4 h-4" />,
              (prop) => `${prop.beds} beds`,
              true
            )}
            {renderComparisonRow(
              'Bathrooms',
              <Bath className="w-4 h-4" />,
              (prop) => `${prop.baths} baths`,
              true
            )}
            {renderComparisonRow(
              'Square Footage',
              <Maximize className="w-4 h-4" />,
              (prop) => formatSqft(prop.sqft),
              true
            )}
            {renderComparisonRow(
              'Year Built',
              <Calendar className="w-4 h-4" />,
              (prop) => prop.yearBuilt.toString(),
              true
            )}
            {renderComparisonRow(
              'Lot Size',
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>,
              (prop) => prop.lotSize > 0 ? `${prop.lotSize.toLocaleString()} sqft` : 'N/A',
              true
            )}
            {renderComparisonRow(
              'Commute Time',
              <Clock className="w-4 h-4" />,
              (prop) => prop.commuteTime ? `${prop.commuteTime} min` : 'N/A',
              true
            )}
            {renderComparisonRow(
              'School Rating',
              <BookOpen className="w-4 h-4" />,
              (prop) => prop.schoolRating ? `${prop.schoolRating}/10` : 'N/A',
              true
            )}
            {renderComparisonRow(
              'Walk Score',
              <Zap className="w-4 h-4" />,
              (prop) => prop.walkScore ? prop.walkScore.toString() : 'N/A',
              true
            )}
            {renderComparisonRow(
              'Property Type',
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>,
              (prop) => prop.propertyType.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              false
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={`pros-cons-${property.id}`}>
            <CardHeader>
              <CardTitle className="text-lg">{property.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pros
                </h4>
                <ul className="space-y-1">
                  {property.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Cons
                </h4>
                <ul className="space-y-1">
                  {property.cons.map((con, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}