import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Globe, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileCard = () => {
  return (
    <div className=" w-full max-w-[400px] h-full">
      <Card className="">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-0 gap-6">
            <div className=" flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <Image
                  src="/avatar.png"
                  alt="Opeyemi Bioku"
                  className="w-[100px] h-[100px] rounded-full object-cover ring-4 ring-green-100"
                  width={100}
                  height={100}
                />
              </div>
              <div className=" space-y-3">
                <h3 className=" text-2xl">Opeyemi Bioku</h3>
                <p className="text-sm text-[#8F8F8F]">COO, 8th Gear</p>
                <p className=" bg-[#EBFFFC] text-[#076C61] px-[24px] rounded-lg w-full text-center text-sm ">Online</p>
              </div>
            </div>

            {/* Training Topic Section */}
            {false && (
              <div className="w-full max-w-[90%] bg-white border border-[#EBEBEB] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                      {/* Progress circle (20% progress for Level 1 of 5) */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#0891B2"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.2)}`} // 20% progress, 30% progress will be 0.3
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-in-out"
                      />
                    </svg>
                  </div>

                  {/* Training Info */}
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-[#5E5B5B] mb-1">Training Topic</h4>
                    <p className="text-sm text-[#5E5B5B]">Level 1 of 5</p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4 text-sm text-center flex flex-col items-center justify-start pt-10 w-full border-t border-[#D9D9D9]">
              <div className="flex items-center gap-2 w-full max-w-[70%]">
                <Mail className="w-5 h-5" color="#B8B8B8" />
                <span className="">opeyemibioku@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 w-full max-w-[70%]">
                <Phone className="w-5 h-5" color="#B8B8B8" />
                <span className="">+23481 6543 9834</span>
              </div>
              <div className="flex items-center gap-2 w-full max-w-[70%]">
                <Globe className="w-5 h-5" color="#B8B8B8" />
                <span className="">www.8thgear.com</span>
              </div>
            </div>
            <div className="space-y-4 text-sm text-center flex flex-col items-center justify-start pt-10  pb-0 w-full border-t border-[#D9D9D9]">
              <div className="flex items-center justify-between gap-2 text-sm w-full max-w-[70%]">
                <div className=" flex flex-col items-start gap-0.5 w-full max-w-[98%]">
                  <span className="text-muted-foreground">Assessment</span>
                  <p className=" bg-[#FFF6D3] text-[#5E5B5B] px-[24px] rounded-lg w-full text-center text-sm ">
                    Not taken
                  </p>
                </div>
                <button>
                  <ChevronRight color="#B8B8B8" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm w-full max-w-[70%]">
                <div className=" flex flex-col items-start gap-0.5 w-full max-w-[98%]">
                  <p className="text-muted-foreground">Policies</p>
                  <button className=" ">Read all Terms and conditions</button>
                </div>
                <button>
                  <ChevronRight color="#B8B8B8" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
