import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export default function WaitlistForm() {
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    instagram_username: '',
    interest_reason: '',
    planned_usage: '',
    business_instagram: ''
  });
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (formData.full_name && formData.email && formData.instagram_username) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Success! You\'ve been added to the waitlist.');
        setFormData({
          full_name: '',
          email: '',
          instagram_username: '',
          interest_reason: '',
          planned_usage: '',
          business_instagram: ''
        });
        setCurrentStep(1);
      } else {
        const errorData = await response.json();
        setSubmitMessage(`Error: ${errorData.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Error: Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Step 1 */}
      {currentStep === 1 && (
        <>
          <div className="grid gap-3">
            <Label htmlFor="full_name">Full Name <span className="text-red-500">*</span></Label>
            <Input 
              id="full_name" 
              name="full_name" 
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required 
            />
          </div>
      
          <div className="grid gap-3">
            <Label htmlFor="instagram_username">Instagram username <span className="text-red-500">*</span></Label>
            <Input 
              id="instagram_username" 
              name="instagram_username" 
              placeholder="@ismaeljimenez.ai"
              value={formData.instagram_username}
              onChange={(e) => handleInputChange('instagram_username', e.target.value)}
              required
            />
          </div>

          <Button
            type="button" 
            onClick={handleNext}
            disabled={!formData.full_name || !formData.email || !formData.instagram_username}
            className="w-full font-bold text-base h-auto bg-gradient-to-br from-emerald-200 via-cyan-300 to-sky-400 text-black hover:from-emerald-300 hover:via-cyan-400 hover:to-sky-500"
          >
            Next
          </Button>
        </>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              <strong>Step 2 of 2:</strong> Almost there! Just a few more questions to help us understand your needs better.
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="interest_reason">What makes you interested in an AI appointment setter?</Label>
            <Textarea
              id="interest_reason" 
              name="interest_reason" 
              placeholder="Type your message here"
              value={formData.interest_reason}
              onChange={(e) => handleInputChange('interest_reason', e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="planned_usage">What do you plan on using it for?</Label>
            <Textarea 
              id="planned_usage" 
              name="planned_usage" 
              placeholder="Type your message here"
              value={formData.planned_usage}
              onChange={(e) => handleInputChange('planned_usage', e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="business_instagram">Do you run a business and post content on Instagram?</Label>
            <Textarea 
              id="business_instagram" 
              name="business_instagram" 
              placeholder="Type your message here"
              value={formData.business_instagram}
              onChange={(e) => handleInputChange('business_instagram', e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              onClick={handleBack}
              variant="outline"
              className="flex-1 font-bold text-base h-auto"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 font-bold text-base h-auto bg-gradient-to-br from-emerald-200 via-cyan-300 to-sky-400 text-black hover:from-emerald-300 hover:via-cyan-400 hover:to-sky-500" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </>
      )}

      {submitMessage && (
        <div className={`text-center p-3 rounded-lg ${
          submitMessage.includes('Success') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
};
