import { useState } from "react";
import { HeartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const predefinedAmounts = [500, 1000, 2000, 5000];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    if (value) {
      setSelectedAmount(parseInt(value) || 0);
    }
  };

  const handleDonate = async () => {
    const finalAmount = isCustom ? parseInt(customAmount) || 0 : selectedAmount;
    
    if (finalAmount < 100) {
      toast.error("Minimum donation amount is ₹100");
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Thank you for your generous donation! You will receive a confirmation email shortly.");
    
    // Reset form
    setSelectedAmount(1000);
    setCustomAmount("");
    setIsCustom(false);
    setDonorInfo({ name: "", email: "", phone: "", message: "" });
    setIsProcessing(false);
  };

  const finalAmount = isCustom ? parseInt(customAmount) || 0 : selectedAmount;

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="animate-fade-in">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <HeartIcon className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-8">
              Support <span className="gradient-text">TEDxAUC</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Your generous donation helps us continue spreading ideas worth sharing 
              and creating transformative experiences for our community.
            </p>
            <div className="card-glow p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Why Your Support Matters</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>We are not forcing you to donate</strong>, but if you want to contribute to our mission, 
                you can donate whatever amount you feel comfortable with. Every contribution, 
                big or small, helps us organize better events, support emerging speakers, 
                and reach more people with inspiring ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Amount Selection */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8">
                Choose Your <span className="gradient-text">Contribution</span>
              </h2>

              {/* Predefined Amounts */}
              <div className="mb-8">
                <Label className="text-lg font-semibold mb-4 block">Select Amount (₹)</Label>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 font-semibold text-lg ${
                        selectedAmount === amount && !isCustom
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="custom-amount" className="text-sm font-medium mb-2 block">
                    Or enter custom amount
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount in ₹"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="text-lg"
                    min="100"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum donation: ₹100
                  </p>
                </div>
              </div>

              {/* Impact Information */}
              <div className="card-glow p-6">
                <h3 className="text-lg font-bold mb-4 gradient-text">Your Impact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>₹500 can sponsor refreshments for 10 attendees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>₹1000 can support technical equipment for one session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>₹2000 can help bring an inspiring speaker to our event</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>₹5000 can sponsor an entire workshop or masterclass</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="text-3xl font-bold mb-8">
                Your <span className="gradient-text">Information</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="donor-name" className="text-sm font-medium mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="donor-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="donor-email" className="text-sm font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="donor-phone" className="text-sm font-medium mb-2 block">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="donor-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="donor-message" className="text-sm font-medium mb-2 block">
                    Message (Optional)
                  </Label>
                  <textarea
                    id="donor-message"
                    rows={4}
                    placeholder="Share a message or tell us what inspired you to donate..."
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>

                {/* Donation Summary */}
                <div className="card-glow p-6">
                  <h3 className="text-lg font-bold mb-4">Donation Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Donation Amount:</span>
                      <span className="text-2xl font-bold gradient-text">₹{finalAmount.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      * Tax receipt will be sent to your email
                    </div>
                  </div>

                  <Button
                    onClick={handleDonate}
                    disabled={isProcessing || finalAmount < 100}
                    className="w-full hero-button"
                  >
                    {isProcessing ? "Processing..." : `Donate ₹${finalAmount.toLocaleString()}`}
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Please Note:</strong> This is a voluntary donation to support TEDxAUC activities. 
                    We appreciate any amount you choose to contribute, but there is no obligation to donate.
                  </p>
                  <p>
                    Your contribution will be used responsibly to organize better events, 
                    support speakers, and enhance the overall TEDx experience for our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="section-padding bg-gradient-to-r from-primary/10 to-primary/5 border-y border-primary/20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Thank You to Our Supporters</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Every contribution makes a difference. Thanks to our generous supporters, 
            we've been able to create meaningful experiences and spread inspiring ideas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Generous Donors" },
              { number: "₹2,50,000+", label: "Total Raised" },
              { number: "10+", label: "Events Sponsored" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;