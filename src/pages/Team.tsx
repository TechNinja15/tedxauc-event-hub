import { Facebook, Instagram, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  {
    id: 1,
    name: "Arjun Sharma",
    position: "Event Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Leading the vision and strategy for TEDxAUC events.",
    social: {
      instagram: "https://instagram.com/arjun.sharma",
      facebook: "https://facebook.com/arjun.sharma",
      linkedin: "https://linkedin.com/in/arjun-sharma"
    }
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "Creative Head",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=400&h=400&fit=crop&crop=face",
    bio: "Bringing creative excellence to every aspect of our events.",
    social: {
      instagram: "https://instagram.com/priya.patel",
      facebook: "https://facebook.com/priya.patel",
      linkedin: "https://linkedin.com/in/priya-patel"
    }
  },
  {
    id: 3,
    name: "Rahul Gupta",
    position: "Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Ensuring flawless technical execution of our events.",
    social: {
      instagram: "https://instagram.com/rahul.gupta",
      facebook: "https://facebook.com/rahul.gupta",
      linkedin: "https://linkedin.com/in/rahul-gupta"
    }
  },
  {
    id: 4,
    name: "Sneha Singh",
    position: "Marketing Head",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Spreading the word and building our community.",
    social: {
      instagram: "https://instagram.com/sneha.singh",
      facebook: "https://facebook.com/sneha.singh",
      linkedin: "https://linkedin.com/in/sneha-singh"
    }
  },
  {
    id: 5,
    name: "Vikram Kumar",
    position: "Operations Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Managing all operational aspects and logistics.",
    social: {
      instagram: "https://instagram.com/vikram.kumar",
      facebook: "https://facebook.com/vikram.kumar",
      linkedin: "https://linkedin.com/in/vikram-kumar"
    }
  },
  {
    id: 6,
    name: "Ananya Joshi",
    position: "Content Curator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    bio: "Curating compelling stories and content for our platform.",
    social: {
      instagram: "https://instagram.com/ananya.joshi",
      facebook: "https://facebook.com/ananya.joshi",
      linkedin: "https://linkedin.com/in/ananya-joshi"
    }
  }
];

const speakers = [
  {
    id: 1,
    name: "Dr. Aisha Rahman",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Kabir Singh",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Maya Desai",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Nisha Kapoor",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
];

const Team = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handlePrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleSpeakerRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      gender: formData.get('gender'),
      occupation: formData.get('occupation'),
      message: formData.get('message'),
    };
    
    toast({
      title: "Registration Submitted!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
    
    e.currentTarget.reset();
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-8">
              Meet Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The passionate individuals behind TEDxAUC who work tirelessly to bring 
              inspiring ideas and transformative experiences to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border border-border hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 gradient-text">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary font-semibold mb-4">
                    {member.position}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  {/* Social Media Buttons */}
                  <div className="flex justify-center gap-3">
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">
              Our <span className="gradient-text">Speakers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet the inspiring voices who share ideas worth spreading
            </p>
          </div>

          <div className="relative group">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/80 backdrop-blur-sm border-primary/50 hover:bg-primary/20"
              onClick={handlePrevious}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/80 backdrop-blur-sm border-primary/50 hover:bg-primary/20"
              onClick={handleNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Scrolling Container */}
            <div
              ref={scrollRef}
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className={`flex gap-8 ${isPaused ? '' : 'animate-scroll'}`}
                style={{
                  width: 'max-content',
                }}
              >
                {/* Duplicate speakers for infinite loop effect */}
                {[...speakers, ...speakers].map((speaker, index) => (
                  <div
                    key={`${speaker.id}-${index}`}
                    className="flex-shrink-0 w-64 text-center"
                  >
                    <div className="relative mb-4 group/card">
                      <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/30 group-hover/card:border-primary transition-all duration-300 group-hover/card:scale-105">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold gradient-text">
                      {speaker.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hero-button">
                  Register as a Speaker
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl gradient-text">Speaker Registration</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSpeakerRegister} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="bg-input border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select name="gender" required>
                      <SelectTrigger className="bg-input border-border focus:border-primary">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-Binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation *</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      placeholder="Enter your occupation"
                      required
                      className="bg-input border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your idea *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Share your idea worth spreading..."
                      required
                      rows={5}
                      className="bg-input border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full hero-button">
                    Submit Registration
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="section-padding bg-gradient-to-r from-primary/10 to-primary/5 border-y border-primary/20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate individuals who share our vision 
            of spreading ideas worth sharing.
          </p>
          <a
            href="mailto:team@tedxauc.org"
            className="hero-button inline-flex items-center"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;