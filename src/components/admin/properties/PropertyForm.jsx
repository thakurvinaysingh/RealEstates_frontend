import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../api/admin';
import { Button } from '../../../components/admin/ui/button';
import { Input } from '../../../components/admin/ui/input';
import { Label } from '../../../components/admin/ui/label';
import { Textarea } from '../../../components/admin/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/admin/ui/select';
import LoadingSpinner from '../../../components/admin/ui/LoadingSpinner';
import { useToast } from '../../../components/hooks/use-toast';
import { Plus, X } from 'lucide-react';

const PropertyForm = ({ propertyId, isEdit = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    location: '',
    startDate: '',
    endDate: '',
    goalAmount: 0,
    currentAmount: 0,
    investorsCount: 0,
    propertyType: '',
    distribution: '',
    maxTerm: '',
    annualReturn: '',
    images: [],
    gallery: [],
    projectDescription: '',
    reasonsToInvest: [],
    financialTerms: {
      maxLoanTerm: '',
      security: '',
      annualReturn: ''
    },
    tieredReturn: [],
    capitalGrowthSplit: [],
    owner: {
      name: '',
      bio: '',
      avatarUrl: ''
    },
    faqs: [],
    risks: '',
    mapEmbedUrl: '',
    occupancyOptions: [],
    investmentOverview: '',
    keyUpdates: [],
    reports: [],
    totalUnits: 0,
    slotsCount: 0,
    slotsSold: 0,
    totalValue: 0,
    // Legacy fields for backward compatibility
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    yearBuilt: new Date().getFullYear(),
    amenities: [],
    status: 'active'
  });

  const [newImage, setNewImage] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newOccupancyOption, setNewOccupancyOption] = useState('');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newTieredReturn, setNewTieredReturn] = useState({ range: '', rate: '' });
  const [newCapitalGrowthSplit, setNewCapitalGrowthSplit] = useState({ party: '', pct: '' });
  const [newKeyUpdate, setNewKeyUpdate] = useState({ date: '', text: '', link: '' });
  const [newReport, setNewReport] = useState({ title: '', desc: '', label: '', url: '' });

  useEffect(() => {
    if (isEdit && propertyId) {
      loadProperty();
    }
  }, [isEdit, propertyId]);

  const loadProperty = async () => {
    if (!propertyId) return;
    
    setLoading(true);
    try {
      const property = await apiService.getProperty(propertyId);
      setFormData({
        ...formData,
        ...property,
        startDate: property.startDate ? new Date(property.startDate).toISOString().split('T')[0] : '',
        endDate: property.endDate ? new Date(property.endDate).toISOString().split('T')[0] : '',
        financialTerms: property.financialTerms || formData.financialTerms,
        owner: property.owner || formData.owner,
        keyUpdates: property.keyUpdates || [],
        reports: property.reports || [],
        tieredReturn: property.tieredReturn || [],
        capitalGrowthSplit: property.capitalGrowthSplit || [],
        faqs: property.faqs || [],
        reasonsToInvest: property.reasonsToInvest || [],
        occupancyOptions: property.occupancyOptions || []
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load property data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      };

      if (isEdit && propertyId) {
        await apiService.updateProperty(propertyId, submitData);
        toast({
          title: 'Success',
          description: 'Property updated successfully',
        });
      } else {
        await apiService.createProperty(submitData);
        toast({
          title: 'Success',
          description: 'Property created successfully',
        });
      }
      navigate('/admin/properties');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEdit ? 'update' : 'create'} property`,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryImage.trim()]
      }));
      setNewGalleryImage('');
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const addReason = () => {
    if (newReason.trim()) {
      setFormData(prev => ({
        ...prev,
        reasonsToInvest: [...prev.reasonsToInvest, newReason.trim()]
      }));
      setNewReason('');
    }
  };

  const removeReason = (index) => {
    setFormData(prev => ({
      ...prev,
      reasonsToInvest: prev.reasonsToInvest.filter((_, i) => i !== index)
    }));
  };

  const addOccupancyOption = () => {
    if (newOccupancyOption.trim()) {
      setFormData(prev => ({
        ...prev,
        occupancyOptions: [...prev.occupancyOptions, newOccupancyOption.trim()]
      }));
      setNewOccupancyOption('');
    }
  };

  const removeOccupancyOption = (index) => {
    setFormData(prev => ({
      ...prev,
      occupancyOptions: prev.occupancyOptions.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...newFaq }]
      }));
      setNewFaq({ question: '', answer: '' });
    }
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addTieredReturn = () => {
    if (newTieredReturn.range.trim() && newTieredReturn.rate.trim()) {
      setFormData(prev => ({
        ...prev,
        tieredReturn: [...prev.tieredReturn, { ...newTieredReturn }]
      }));
      setNewTieredReturn({ range: '', rate: '' });
    }
  };

  const removeTieredReturn = (index) => {
    setFormData(prev => ({
      ...prev,
      tieredReturn: prev.tieredReturn.filter((_, i) => i !== index)
    }));
  };

  const addCapitalGrowthSplit = () => {
    if (newCapitalGrowthSplit.party.trim() && newCapitalGrowthSplit.pct.trim()) {
      setFormData(prev => ({
        ...prev,
        capitalGrowthSplit: [...prev.capitalGrowthSplit, { ...newCapitalGrowthSplit }]
      }));
      setNewCapitalGrowthSplit({ party: '', pct: '' });
    }
  };

  const removeCapitalGrowthSplit = (index) => {
    setFormData(prev => ({
      ...prev,
      capitalGrowthSplit: prev.capitalGrowthSplit.filter((_, i) => i !== index)
    }));
  };

  const addKeyUpdate = () => {
    if (newKeyUpdate.text.trim()) {
      setFormData(prev => ({
        ...prev,
        keyUpdates: [...prev.keyUpdates, { 
          ...newKeyUpdate,
          date: newKeyUpdate.date ? new Date(newKeyUpdate.date) : new Date()
        }]
      }));
      setNewKeyUpdate({ date: '', text: '', link: '' });
    }
  };

  const removeKeyUpdate = (index) => {
    setFormData(prev => ({
      ...prev,
      keyUpdates: prev.keyUpdates.filter((_, i) => i !== index)
    }));
  };

  const addReport = () => {
    if (newReport.title.trim() && newReport.url.trim()) {
      setFormData(prev => ({
        ...prev,
        reports: [...prev.reports, { ...newReport }]
      }));
      setNewReport({ title: '', desc: '', label: '', url: '' });
    }
  };

  const removeReport = (index) => {
    setFormData(prev => ({
      ...prev,
      reports: prev.reports.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        {isEdit ? 'Edit Property' : 'Create New Property'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-blue-900">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-blue-900">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-900">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-blue-900">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
              >
                <SelectTrigger className="rounded-lg" >
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-lg">
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-blue-900">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-blue-900">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Investment Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Investment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="goalAmount" className="text-blue-900">Goal Amount ($)</Label>
              <Input
                id="goalAmount"
                type="number"
                value={formData.goalAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, goalAmount: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAmount" className="text-blue-900">Current Amount ($)</Label>
              <Input
                id="currentAmount"
                type="number"
                value={formData.currentAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, currentAmount: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investorsCount" className="text-blue-900">Investors Count</Label>
              <Input
                id="investorsCount"
                type="number"
                value={formData.investorsCount}
                onChange={(e) => setFormData(prev => ({ ...prev, investorsCount: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualReturn" className="text-blue-900">Annual Return (%)</Label>
              <Input
                id="annualReturn"
                value={formData.annualReturn}
                onChange={(e) => setFormData(prev => ({ ...prev, annualReturn: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distribution" className="text-blue-900">Distribution</Label>
              <Input
                id="distribution"
                value={formData.distribution}
                onChange={(e) => setFormData(prev => ({ ...prev, distribution: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTerm" className="text-blue-900">Max Term</Label>
              <Input
                id="maxTerm"
                value={formData.maxTerm}
                onChange={(e) => setFormData(prev => ({ ...prev, maxTerm: e.target.value }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalUnits" className="text-blue-900">Total Units</Label>
              <Input
                id="totalUnits"
                type="number"
                value={formData.totalUnits}
                onChange={(e) => setFormData(prev => ({ ...prev, totalUnits: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slotsCount" className="text-blue-900">Slots Count</Label>
              <Input
                id="slotsCount"
                type="number"
                value={formData.slotsCount}
                onChange={(e) => setFormData(prev => ({ ...prev, slotsCount: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slotsSold" className="text-blue-900">Slots Sold</Label>
              <Input
                id="slotsSold"
                type="number"
                value={formData.slotsSold}
                onChange={(e) => setFormData(prev => ({ ...prev, slotsSold: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalValue" className="text-blue-900">Total Value ($)</Label>
              <Input
                id="totalValue"
                type="number"
                value={formData.totalValue}
                onChange={(e) => setFormData(prev => ({ ...prev, totalValue: Number(e.target.value) }))}
                min="0"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Descriptions</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectDescription" className="text-blue-900">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                rows={4}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentOverview" className="text-blue-900">Investment Overview</Label>
              <Textarea
                id="investmentOverview"
                value={formData.investmentOverview}
                onChange={(e) => setFormData(prev => ({ ...prev, investmentOverview: e.target.value }))}
                rows={4}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="risks" className="text-blue-900">Risks</Label>
              <Textarea
                id="risks"
                value={formData.risks}
                onChange={(e) => setFormData(prev => ({ ...prev, risks: e.target.value }))}
                rows={3}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapEmbedUrl" className="text-blue-900">Map Embed URL</Label>
              <Input
                id="mapEmbedUrl"
                value={formData.mapEmbedUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, mapEmbedUrl: e.target.value }))}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Owner Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Owner Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ownerName" className="text-blue-900">Owner Name</Label>
              <Input
                id="ownerName"
                value={formData.owner.name}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  owner: { ...prev.owner, name: e.target.value }
                }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerAvatarUrl" className="text-blue-900">Owner Avatar URL</Label>
              <Input
                id="ownerAvatarUrl"
                value={formData.owner.avatarUrl}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  owner: { ...prev.owner, avatarUrl: e.target.value }
                }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ownerBio" className="text-blue-900">Owner Bio</Label>
              <Textarea
                id="ownerBio"
                value={formData.owner.bio}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  owner: { ...prev.owner, bio: e.target.value }
                }))}
                rows={3}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Financial Terms */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Financial Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxLoanTerm" className="text-blue-900">Max Loan Term</Label>
              <Input
                id="maxLoanTerm"
                value={formData.financialTerms.maxLoanTerm}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  financialTerms: { ...prev.financialTerms, maxLoanTerm: e.target.value }
                }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="security" className="text-blue-900">Security</Label>
              <Input
                id="security"
                value={formData.financialTerms.security}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  financialTerms: { ...prev.financialTerms, security: e.target.value }
                }))}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialAnnualReturn" className="text-blue-900">Financial Annual Return</Label>
              <Input
                id="financialAnnualReturn"
                value={formData.financialTerms.annualReturn}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  financialTerms: { ...prev.financialTerms, annualReturn: e.target.value }
                }))}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-900">Images</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-blue-900">Property Images</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter image URL"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="rounded-lg"
                />
                <Button type="button" onClick={addImage} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                    <img src={image} alt="" className="w-16 h-16 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="bg-[#5927e3] text-white hover:opacity-90"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-blue-900">Gallery Images</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter gallery image URL"
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  className="rounded-lg"
                />
                <Button type="button" onClick={addGalleryImage} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.gallery.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                    <img src={image} alt="" className="w-16 h-16 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeGalleryImage(index)}
                      className="bg-[#5927e3] text-white hover:opacity-90"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-900">Lists & Arrays</h3>
          
          {/* Reasons to Invest */}
          <div className="space-y-4">
            <Label className="text-blue-900">Reasons to Invest</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter reason to invest"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                className="rounded-lg"
              />
              <Button type="button" onClick={addReason} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.reasonsToInvest.map((reason, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="text-sm">{reason}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReason(index)}
                    className="bg-[#5927e3] text-white hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Occupancy Options */}
          <div className="space-y-4">
            <Label className="text-blue-900">Occupancy Options</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter occupancy option"
                value={newOccupancyOption}
                onChange={(e) => setNewOccupancyOption(e.target.value)}
                className="rounded-lg"
              />
              <Button type="button" onClick={addOccupancyOption} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.occupancyOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="text-sm">{option}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeOccupancyOption(index)}
                    className="bg-[#5927e3] text-white hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <Label className="text-blue-900">FAQs</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Question"
                value={newFaq.question}
                onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                  className="rounded-lg"
                />
                <Button type="button" onClick={addFaq} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="flex items-start gap-2 bg-gray-100 p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{faq.question}</div>
                    <div className="text-sm text-gray-500">{faq.answer}</div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFaq(index)}
                    className="bg-[#5927e3] text-white hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tiered Return */}
          <div className="space-y-4">
            <Label className="text-blue-900">Tiered Return</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Range (e.g., $0-$50k)"
                value={newTieredReturn.range}
                onChange={(e) => setNewTieredReturn(prev => ({ ...prev, range: e.target.value }))}
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Rate (e.g., 8%)"
                  value={newTieredReturn.rate}
                  onChange={(e) => setNewTieredReturn(prev => ({ ...prev, rate: e.target.value }))}
                  className="rounded-lg"
                />
                <Button type="button" onClick={addTieredReturn} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.tieredReturn.map((tier, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm flex-1">{tier.range}: {tier.rate}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTieredReturn(index)}
                    className="bg-[#5927e3] text-white hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Capital Growth Split */}
          <div className="space-y-4">
            <Label className="text-blue-900">Capital Growth Split</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Party (e.g., Investors)"
                value={newCapitalGrowthSplit.party}
                onChange={(e) => setNewCapitalGrowthSplit(prev => ({ ...prev, party: e.target.value }))}
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Percentage (e.g., 70%)"
                  value={newCapitalGrowthSplit.pct}
                  onChange={(e) => setNewCapitalGrowthSplit(prev => ({ ...prev, pct: e.target.value }))}
                  className="rounded-lg"
                />
                <Button type="button" onClick={addCapitalGrowthSplit} variant="outline" className="bg-[#5927e3] text-white hover:opacity-90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.capitalGrowthSplit.map((split, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                  <span className="text-sm flex-1">{split.party}: {split.pct}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCapitalGrowthSplit(index)}
                    className="bg-[#5927e3] text-white hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#5927e3] text-white hover:opacity-90"
          >
            {submitting && <LoadingSpinner size="sm" className="mr-2" />}
            {isEdit ? 'Update Property' : 'Create Property'}
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="bg-[#5927e3] text-white hover:opacity-90"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiService } from '../../../api/admin';
// import { Button } from '../../../components/admin/ui/button';
// import { Input } from '../../../components/admin/ui/input';
// import { Label } from '../../../components/admin/ui/label';
// import { Textarea } from '../../../components/admin/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/admin/ui/select';
// import LoadingSpinner from '../../../components/admin/ui/LoadingSpinner';
// import { useToast } from '../../../components/hooks/use-toast';
// import { Plus, X } from 'lucide-react';

// const PropertyForm = ({ propertyId, isEdit = false }) => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     address: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     goalAmount: 0,
//     currentAmount: 0,
//     investorsCount: 0,
//     propertyType: '',
//     distribution: '',
//     maxTerm: '',
//     annualReturn: '',
//     images: [],
//     gallery: [],
//     projectDescription: '',
//     reasonsToInvest: [],
//     financialTerms: {
//       maxLoanTerm: '',
//       security: '',
//       annualReturn: ''
//     },
//     tieredReturn: [],
//     capitalGrowthSplit: [],
//     owner: {
//       name: '',
//       bio: '',
//       avatarUrl: ''
//     },
//     faqs: [],
//     risks: '',
//     mapEmbedUrl: '',
//     occupancyOptions: [],
//     investmentOverview: '',
//     keyUpdates: [],
//     reports: [],
//     totalUnits: 0,
//     slotsCount: 0,
//     slotsSold: 0,
//     totalValue: 0,
//     // Legacy fields for backward compatibility
//     price: 0,
//     bedrooms: 0,
//     bathrooms: 0,
//     area: 0,
//     yearBuilt: new Date().getFullYear(),
//     amenities: [],
//     status: 'active'
//   });

//   const [newImage, setNewImage] = useState('');
//   const [newGalleryImage, setNewGalleryImage] = useState('');
//   const [newReason, setNewReason] = useState('');
//   const [newOccupancyOption, setNewOccupancyOption] = useState('');
//   const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
//   const [newTieredReturn, setNewTieredReturn] = useState({ range: '', rate: '' });
//   const [newCapitalGrowthSplit, setNewCapitalGrowthSplit] = useState({ party: '', pct: '' });
//   const [newKeyUpdate, setNewKeyUpdate] = useState({ date: '', text: '', link: '' });
//   const [newReport, setNewReport] = useState({ title: '', desc: '', label: '', url: '' });

//   useEffect(() => {
//     if (isEdit && propertyId) {
//       loadProperty();
//     }
//   }, [isEdit, propertyId]);

//   const loadProperty = async () => {
//     if (!propertyId) return;
    
//     setLoading(true);
//     try {
//       const property = await apiService.getProperty(propertyId);
//       setFormData({
//         ...formData,
//         ...property,
//         startDate: property.startDate ? new Date(property.startDate).toISOString().split('T')[0] : '',
//         endDate: property.endDate ? new Date(property.endDate).toISOString().split('T')[0] : '',
//         financialTerms: property.financialTerms || formData.financialTerms,
//         owner: property.owner || formData.owner,
//         keyUpdates: property.keyUpdates || [],
//         reports: property.reports || [],
//         tieredReturn: property.tieredReturn || [],
//         capitalGrowthSplit: property.capitalGrowthSplit || [],
//         faqs: property.faqs || [],
//         reasonsToInvest: property.reasonsToInvest || [],
//         occupancyOptions: property.occupancyOptions || []
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to load property data',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const submitData = {
//         ...formData,
//         startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
//         endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
//       };

//       if (isEdit && propertyId) {
//         await apiService.updateProperty(propertyId, submitData);
//         toast({
//           title: 'Success',
//           description: 'Property updated successfully',
//         });
//       } else {
//         await apiService.createProperty(submitData);
//         toast({
//           title: 'Success',
//           description: 'Property created successfully',
//         });
//       }
//       navigate('/properties');
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: `Failed to ${isEdit ? 'update' : 'create'} property`,
//         variant: 'destructive',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const addImage = () => {
//     if (newImage.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         images: [...prev.images, newImage.trim()]
//       }));
//       setNewImage('');
//     }
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const addGalleryImage = () => {
//     if (newGalleryImage.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         gallery: [...prev.gallery, newGalleryImage.trim()]
//       }));
//       setNewGalleryImage('');
//     }
//   };

//   const removeGalleryImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.filter((_, i) => i !== index)
//     }));
//   };

//   const addReason = () => {
//     if (newReason.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         reasonsToInvest: [...prev.reasonsToInvest, newReason.trim()]
//       }));
//       setNewReason('');
//     }
//   };

//   const removeReason = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       reasonsToInvest: prev.reasonsToInvest.filter((_, i) => i !== index)
//     }));
//   };

//   const addOccupancyOption = () => {
//     if (newOccupancyOption.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         occupancyOptions: [...prev.occupancyOptions, newOccupancyOption.trim()]
//       }));
//       setNewOccupancyOption('');
//     }
//   };

//   const removeOccupancyOption = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       occupancyOptions: prev.occupancyOptions.filter((_, i) => i !== index)
//     }));
//   };

//   const addFaq = () => {
//     if (newFaq.question.trim() && newFaq.answer.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         faqs: [...prev.faqs, { ...newFaq }]
//       }));
//       setNewFaq({ question: '', answer: '' });
//     }
//   };

//   const removeFaq = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       faqs: prev.faqs.filter((_, i) => i !== index)
//     }));
//   };

//   const addTieredReturn = () => {
//     if (newTieredReturn.range.trim() && newTieredReturn.rate.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         tieredReturn: [...prev.tieredReturn, { ...newTieredReturn }]
//       }));
//       setNewTieredReturn({ range: '', rate: '' });
//     }
//   };

//   const removeTieredReturn = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       tieredReturn: prev.tieredReturn.filter((_, i) => i !== index)
//     }));
//   };

//   const addCapitalGrowthSplit = () => {
//     if (newCapitalGrowthSplit.party.trim() && newCapitalGrowthSplit.pct.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         capitalGrowthSplit: [...prev.capitalGrowthSplit, { ...newCapitalGrowthSplit }]
//       }));
//       setNewCapitalGrowthSplit({ party: '', pct: '' });
//     }
//   };

//   const removeCapitalGrowthSplit = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       capitalGrowthSplit: prev.capitalGrowthSplit.filter((_, i) => i !== index)
//     }));
//   };

//   const addKeyUpdate = () => {
//     if (newKeyUpdate.text.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         keyUpdates: [...prev.keyUpdates, { 
//           ...newKeyUpdate,
//           date: newKeyUpdate.date ? new Date(newKeyUpdate.date) : new Date()
//         }]
//       }));
//       setNewKeyUpdate({ date: '', text: '', link: '' });
//     }
//   };

//   const removeKeyUpdate = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       keyUpdates: prev.keyUpdates.filter((_, i) => i !== index)
//     }));
//   };

//   const addReport = () => {
//     if (newReport.title.trim() && newReport.url.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         reports: [...prev.reports, { ...newReport }]
//       }));
//       setNewReport({ title: '', desc: '', label: '', url: '' });
//     }
//   };

//   const removeReport = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       reports: prev.reports.filter((_, i) => i !== index)
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
//       <h2 className="text-2xl font-bold text-card-foreground mb-6">
//         {isEdit ? 'Edit Property' : 'Create New Property'}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Property Title</Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                 required
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 value={formData.address}
//                 onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                 required
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="propertyType">Property Type</Label>
//               <Select
//                 value={formData.propertyType}
//                 onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
//               >
//                 <SelectTrigger className="rounded-lg">
//                   <SelectValue placeholder="Select property type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="residential">Residential</SelectItem>
//                   <SelectItem value="commercial">Commercial</SelectItem>
//                   <SelectItem value="industrial">Industrial</SelectItem>
//                   <SelectItem value="land">Land</SelectItem>
//                   <SelectItem value="mixed-use">Mixed Use</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="startDate">Start Date</Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="endDate">End Date</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 value={formData.endDate}
//                 onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Investment Details */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Investment Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="goalAmount">Goal Amount ($)</Label>
//               <Input
//                 id="goalAmount"
//                 type="number"
//                 value={formData.goalAmount}
//                 onChange={(e) => setFormData(prev => ({ ...prev, goalAmount: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="currentAmount">Current Amount ($)</Label>
//               <Input
//                 id="currentAmount"
//                 type="number"
//                 value={formData.currentAmount}
//                 onChange={(e) => setFormData(prev => ({ ...prev, currentAmount: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="investorsCount">Investors Count</Label>
//               <Input
//                 id="investorsCount"
//                 type="number"
//                 value={formData.investorsCount}
//                 onChange={(e) => setFormData(prev => ({ ...prev, investorsCount: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="annualReturn">Annual Return (%)</Label>
//               <Input
//                 id="annualReturn"
//                 value={formData.annualReturn}
//                 onChange={(e) => setFormData(prev => ({ ...prev, annualReturn: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="distribution">Distribution</Label>
//               <Input
//                 id="distribution"
//                 value={formData.distribution}
//                 onChange={(e) => setFormData(prev => ({ ...prev, distribution: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="maxTerm">Max Term</Label>
//               <Input
//                 id="maxTerm"
//                 value={formData.maxTerm}
//                 onChange={(e) => setFormData(prev => ({ ...prev, maxTerm: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="totalUnits">Total Units</Label>
//               <Input
//                 id="totalUnits"
//                 type="number"
//                 value={formData.totalUnits}
//                 onChange={(e) => setFormData(prev => ({ ...prev, totalUnits: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="slotsCount">Slots Count</Label>
//               <Input
//                 id="slotsCount"
//                 type="number"
//                 value={formData.slotsCount}
//                 onChange={(e) => setFormData(prev => ({ ...prev, slotsCount: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="slotsSold">Slots Sold</Label>
//               <Input
//                 id="slotsSold"
//                 type="number"
//                 value={formData.slotsSold}
//                 onChange={(e) => setFormData(prev => ({ ...prev, slotsSold: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="totalValue">Total Value ($)</Label>
//               <Input
//                 id="totalValue"
//                 type="number"
//                 value={formData.totalValue}
//                 onChange={(e) => setFormData(prev => ({ ...prev, totalValue: Number(e.target.value) }))}
//                 min="0"
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Descriptions */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Descriptions</h3>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="projectDescription">Project Description</Label>
//               <Textarea
//                 id="projectDescription"
//                 value={formData.projectDescription}
//                 onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
//                 rows={4}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="investmentOverview">Investment Overview</Label>
//               <Textarea
//                 id="investmentOverview"
//                 value={formData.investmentOverview}
//                 onChange={(e) => setFormData(prev => ({ ...prev, investmentOverview: e.target.value }))}
//                 rows={4}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="risks">Risks</Label>
//               <Textarea
//                 id="risks"
//                 value={formData.risks}
//                 onChange={(e) => setFormData(prev => ({ ...prev, risks: e.target.value }))}
//                 rows={3}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="mapEmbedUrl">Map Embed URL</Label>
//               <Input
//                 id="mapEmbedUrl"
//                 value={formData.mapEmbedUrl}
//                 onChange={(e) => setFormData(prev => ({ ...prev, mapEmbedUrl: e.target.value }))}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Owner Information */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Owner Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="ownerName">Owner Name</Label>
//               <Input
//                 id="ownerName"
//                 value={formData.owner.name}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   owner: { ...prev.owner, name: e.target.value }
//                 }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="ownerAvatarUrl">Owner Avatar URL</Label>
//               <Input
//                 id="ownerAvatarUrl"
//                 value={formData.owner.avatarUrl}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   owner: { ...prev.owner, avatarUrl: e.target.value }
//                 }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2 md:col-span-2">
//               <Label htmlFor="ownerBio">Owner Bio</Label>
//               <Textarea
//                 id="ownerBio"
//                 value={formData.owner.bio}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   owner: { ...prev.owner, bio: e.target.value }
//                 }))}
//                 rows={3}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Financial Terms */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Financial Terms</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="maxLoanTerm">Max Loan Term</Label>
//               <Input
//                 id="maxLoanTerm"
//                 value={formData.financialTerms.maxLoanTerm}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   financialTerms: { ...prev.financialTerms, maxLoanTerm: e.target.value }
//                 }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="security">Security</Label>
//               <Input
//                 id="security"
//                 value={formData.financialTerms.security}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   financialTerms: { ...prev.financialTerms, security: e.target.value }
//                 }))}
//                 className="rounded-lg"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="financialAnnualReturn">Financial Annual Return</Label>
//               <Input
//                 id="financialAnnualReturn"
//                 value={formData.financialTerms.annualReturn}
//                 onChange={(e) => setFormData(prev => ({ 
//                   ...prev, 
//                   financialTerms: { ...prev.financialTerms, annualReturn: e.target.value }
//                 }))}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-card-foreground">Images</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <Label>Property Images</Label>
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Enter image URL"
//                   value={newImage}
//                   onChange={(e) => setNewImage(e.target.value)}
//                   className="rounded-lg"
//                 />
//                 <Button type="button" onClick={addImage} variant="outline">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
//                     <img src={image} alt="" className="w-16 h-16 object-cover rounded" />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeImage(index)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Label>Gallery Images</Label>
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Enter gallery image URL"
//                   value={newGalleryImage}
//                   onChange={(e) => setNewGalleryImage(e.target.value)}
//                   className="rounded-lg"
//                 />
//                 <Button type="button" onClick={addGalleryImage} variant="outline">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {formData.gallery.map((image, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
//                     <img src={image} alt="" className="w-16 h-16 object-cover rounded" />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeGalleryImage(index)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Lists */}
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold text-card-foreground">Lists & Arrays</h3>
          
//           {/* Reasons to Invest */}
//           <div className="space-y-4">
//             <Label>Reasons to Invest</Label>
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter reason to invest"
//                 value={newReason}
//                 onChange={(e) => setNewReason(e.target.value)}
//                 className="rounded-lg"
//               />
//               <Button type="button" onClick={addReason} variant="outline">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {formData.reasonsToInvest.map((reason, index) => (
//                 <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg">
//                   <span className="text-sm">{reason}</span>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => removeReason(index)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Occupancy Options */}
//           <div className="space-y-4">
//             <Label>Occupancy Options</Label>
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter occupancy option"
//                 value={newOccupancyOption}
//                 onChange={(e) => setNewOccupancyOption(e.target.value)}
//                 className="rounded-lg"
//               />
//               <Button type="button" onClick={addOccupancyOption} variant="outline">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {formData.occupancyOptions.map((option, index) => (
//                 <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg">
//                   <span className="text-sm">{option}</span>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => removeOccupancyOption(index)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* FAQs */}
//           <div className="space-y-4">
//             <Label>FAQs</Label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 placeholder="Question"
//                 value={newFaq.question}
//                 onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
//                 className="rounded-lg"
//               />
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Answer"
//                   value={newFaq.answer}
//                   onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
//                   className="rounded-lg"
//                 />
//                 <Button type="button" onClick={addFaq} variant="outline">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="space-y-2">
//               {formData.faqs.map((faq, index) => (
//                 <div key={index} className="flex items-start gap-2 bg-muted p-3 rounded-lg">
//                   <div className="flex-1">
//                     <div className="font-medium text-sm">{faq.question}</div>
//                     <div className="text-sm text-muted-foreground">{faq.answer}</div>
//                   </div>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => removeFaq(index)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Tiered Return */}
//           <div className="space-y-4">
//             <Label>Tiered Return</Label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 placeholder="Range (e.g., $0-$50k)"
//                 value={newTieredReturn.range}
//                 onChange={(e) => setNewTieredReturn(prev => ({ ...prev, range: e.target.value }))}
//                 className="rounded-lg"
//               />
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Rate (e.g., 8%)"
//                   value={newTieredReturn.rate}
//                   onChange={(e) => setNewTieredReturn(prev => ({ ...prev, rate: e.target.value }))}
//                   className="rounded-lg"
//                 />
//                 <Button type="button" onClick={addTieredReturn} variant="outline">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="space-y-2">
//               {formData.tieredReturn.map((tier, index) => (
//                 <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
//                   <span className="text-sm flex-1">{tier.range}: {tier.rate}</span>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => removeTieredReturn(index)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Capital Growth Split */}
//           <div className="space-y-4">
//             <Label>Capital Growth Split</Label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 placeholder="Party (e.g., Investors)"
//                 value={newCapitalGrowthSplit.party}
//                 onChange={(e) => setNewCapitalGrowthSplit(prev => ({ ...prev, party: e.target.value }))}
//                 className="rounded-lg"
//               />
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Percentage (e.g., 70%)"
//                   value={newCapitalGrowthSplit.pct}
//                   onChange={(e) => setNewCapitalGrowthSplit(prev => ({ ...prev, pct: e.target.value }))}
//                   className="rounded-lg"
//                 />
//                 <Button type="button" onClick={addCapitalGrowthSplit} variant="outline">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <div className="space-y-2">
//               {formData.capitalGrowthSplit.map((split, index) => (
//                 <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
//                   <span className="text-sm flex-1">{split.party}: {split.pct}</span>
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => removeCapitalGrowthSplit(index)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <Button
//             type="submit"
//             disabled={submitting}
//             className="bg-gradient-primary hover:opacity-90"
//           >
//             {submitting && <LoadingSpinner size="sm" className="mr-2" />}
//             {isEdit ? 'Update Property' : 'Create Property'}
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => navigate('/properties')}
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PropertyForm;