export const mockProperties = [
    {
      id: '1',
      title: 'Luxury Downtown Condo',
      description: 'Prime location high-rise condominium in the heart of Manhattan with stunning city views.',
      location: 'New York, NY',
      images: [
        'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      totalValue: 2500000,
      tokenPrice: 250,
      totalTokens: 10000,
      soldTokens: 6500,
      minInvestment: 500,
      expectedROI: 12.5,
      lockPeriod: 3,
      status: 'active',
      legalDocs: ['Property_Deed.pdf', 'Legal_Opinion.pdf'],
      propertyType: 'residential',
      yearBuilt: 2018,
      sqft: 1250,
      createdAt: new Date('2024-01-15'),
      adminApproved: true
    },
    {
      id: '2',
      title: 'Commercial Office Building',
      description: 'Modern 15-story office building with premium tenants and stable rental income.',
      location: 'Austin, TX',
      images: [
        'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      totalValue: 8500000,
      tokenPrice: 850,
      totalTokens: 10000,
      soldTokens: 3200,
      minInvestment: 500,
      expectedROI: 15.2,
      lockPeriod: 3,
      status: 'active',
      legalDocs: ['Commercial_Lease.pdf', 'Tenant_Reports.pdf'],
      propertyType: 'commercial',
      yearBuilt: 2020,
      sqft: 45000,
      createdAt: new Date('2024-02-01'),
      adminApproved: true
    },
    {
      id: '3',
      title: 'Beachfront Resort Villa',
      description: 'Exclusive beachfront property in Miami with luxury amenities and vacation rental potential.',
      location: 'Miami, FL',
      images: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      totalValue: 4200000,
      tokenPrice: 420,
      totalTokens: 10000,
      soldTokens: 8900,
      minInvestment: 500,
      expectedROI: 18.7,
      lockPeriod: 3,
      status: 'active',
      legalDocs: ['Resort_License.pdf', 'Environmental_Report.pdf'],
      propertyType: 'residential',
      yearBuilt: 2019,
      sqft: 3500,
      createdAt: new Date('2024-01-28'),
      adminApproved: true
    }
  ];
  
  export const mockInvestments = [
    {
      id: '1',
      userId: '0x742d35Cc6563C13426c7f6AEB6DE4b2d55eE8eB7',
      propertyId: '1',
      amount: 5000,
      tokens: 20,
      currency: 'USDT',
      txHash: '0x1234567890abcdef',
      createdAt: new Date('2024-02-15'),
      lockedUntil: new Date('2024-05-15'),
      isLocked: true,
      currentValue: 5250
    },
    {
      id: '2',
      userId: '0x742d35Cc6563C13426c7f6AEB6DE4b2d55eE8eB7',
      propertyId: '2',
      amount: 2500,
      tokens: 3,
      currency: 'USDC',
      txHash: '0xabcdef1234567890',
      createdAt: new Date('2024-01-20'),
      lockedUntil: new Date('2024-04-20'),
      isLocked: false,
      currentValue: 2875
    }
  ];
  
  export const mockMarketplaceListings = [
    {
      id: '1',
      sellerId: '0x123456789',
      propertyId: '1',
      tokens: 10,
      pricePerToken: 275,
      totalPrice: 2750,
      listingType: 'fixed',
      status: 'active',
      createdAt: new Date('2024-02-20')
    },
    {
      id: '2',
      sellerId: '0x987654321',
      propertyId: '2',
      tokens: 5,
      pricePerToken: 900,
      totalPrice: 4500,
      listingType: 'auction',
      auctionEndTime: new Date('2024-03-15'),
      highestBid: 4200,
      highestBidder: '0xabc123def456',
      status: 'active',
      createdAt: new Date('2024-02-18')
    }
  ];
  