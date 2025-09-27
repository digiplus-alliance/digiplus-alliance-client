'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/PageHeader';
import ApplicationSuccessModal from './ApplicationSuccessModal';
import { useGetServiceTypes } from '@/app/api/services/useGetServiceTypes';

const ApplicationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    company_name: '',
    fullName: '',
    email: '',
    phone_number: '',
    reason_for_applying: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data, isLoading } = useGetServiceTypes();

  const [serviceTypes, setServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setServiceTypes(data.service_types);
    }
  }, [isLoading, data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="space-y-4 font-secondary">
      <PageHeader title="Application Form" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Left Side - Information */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-xl font-medium text-[#5E5B5B]">One form. All the support you need.</h1>

            <h2 className="text-xl  text-[#706C6C]">Ready to grow your business?</h2>

            <p className="text-[#706C6C] leading-relaxed text-xl">
              Whether it&apos;s training, advisory, or digital tools you&apos;re just a few steps away from getting
              started.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full">
          <Card className="bg-white border border-gray-200 rounded-[24px]">
            <CardContent className="px-10 py-6">
              <div className="space-y-6">
                <h3 className="text-xl font-normal text-[#5E5B5B] text-center">
                  Apply for a Digiplus Program or Service
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="text-sm  text-[#706C6C]">Service</label>
                    <Select onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="w-full h-14 border-[#EBEBEB] rounded-lg py-5">
                        <SelectValue placeholder="Select" className=" py-3" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((serviceType) => (
                          <SelectItem key={serviceType} value={serviceType}>
                            {serviceType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Company Name and Full Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm  text-[#706C6C]">Company Name</label>
                      <Input
                        placeholder="Company Name"
                        value={formData.company_name}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm  text-[#706C6C]">Full Name</label>
                      <Input
                        placeholder="First and Last name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="h-11 py-4 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm  text-[#706C6C]">Confirm Email</label>
                      <Input
                        type="email"
                        placeholder="Email@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-11 py-4 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm  text-[#706C6C]">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+234 80 2121 2323"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        className="h-11 py-4 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                      />
                    </div>
                  </div>

                  {/* Reason for applying */}
                  <div className="space-y-2">
                    <label className="text-sm  text-[#706C6C]">Reason for applying</label>
                    <Textarea
                      placeholder="Start typing"
                      value={formData.reason_for_applying}
                      onChange={(e) => handleInputChange('reason_for_applying', e.target.value)}
                      className="min-h-[96px] border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F] resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#FF5C5C] mt-6 hover:bg-[#FF4444] text-white  rounded-lg"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      <ApplicationSuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </div>
  );
};

export default ApplicationForm;
