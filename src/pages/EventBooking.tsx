import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock event data
const eventDetails = {
  1: {
    title: "Innovation Summit 2024",
    date: "October 15, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Main Auditorium, Amity University",
    price: 500
  },
  2: {
    title: "Future of AI & Technology",
    date: "November 20, 2024",
    time: "2:00 PM - 8:00 PM",
    location: "Tech Center, Amity University",
    price: 750
  },
  3: {
    title: "Sustainable Future Conference",
    date: "December 10, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Green Campus, Amity University",
    price: 600
  }
};

type SeatStatus = "available" | "selected" | "booked";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

const EventBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const event = eventDetails[Number(eventId) as keyof typeof eventDetails];

  // Generate seat layout matching the theater arrangement
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    
    // Rows A-I: seats 1-14 on left, 15-28 on right
    const regularRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    regularRows.forEach((row) => {
      for (let i = 1; i <= 28; i++) {
        const seatId = `${row}${i}`;
        const isBooked = Math.random() < 0.3; // 30% seats pre-booked
        seats.push({
          id: seatId,
          row,
          number: i,
          status: isBooked ? "booked" : "available",
          price: event?.price || 500
        });
      }
    });

    // Rows J-M: 1-4 on left, 5-18 in middle, 19-22 on right
    const backRows = ["J", "K", "L", "M"];
    backRows.forEach((row) => {
      for (let i = 1; i <= 22; i++) {
        const seatId = `${row}${i}`;
        const isBooked = Math.random() < 0.3; // 30% seats pre-booked
        seats.push({
          id: seatId,
          row,
          number: i,
          status: isBooked ? "booked" : "available",
          price: event?.price || 500
        });
      }
    });

    // Last line seats
    for (let i = 1; i <= 20; i++) {
      const seatId = `L${i}`;
      const isBooked = Math.random() < 0.3;
      seats.push({
        id: `LAST${i}`,
        row: "LAST",
        number: i,
        status: isBooked ? "booked" : "available",
        price: event?.price || 500
      });
    }

    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (event) {
      setSeats(generateSeats());
    }
  }, [event]);

  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button onClick={() => navigate("/events")}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === "booked") return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "booked") return "bg-muted text-muted-foreground cursor-not-allowed";
    if (selectedSeats.includes(seat.id)) return "bg-primary text-primary-foreground";
    return "bg-card border border-border hover:border-primary hover:bg-primary/10 cursor-pointer";
  };

  const totalAmount = selectedSeats.length * (event.price || 500);

  const handleBookingSubmit = async () => {
    if (bookingStep === 1) {
      if (selectedSeats.length === 0) {
        toast.error("Please select at least one seat");
        return;
      }
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        toast.error("Please fill in all customer details");
        return;
      }
      setBookingStep(3);
    } else {
      // Final booking
      toast.success("Booking confirmed! You will receive a confirmation email shortly.");
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/events")}
              className="flex items-center space-x-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Events</span>
            </Button>
            <div className="text-right">
              <h1 className="text-2xl font-bold gradient-text">{event.title}</h1>
              <p className="text-muted-foreground">{event.date} • {event.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                bookingStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {bookingStep > step ? <CheckCircleIcon className="h-6 w-6" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 ${bookingStep > step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Seat Selection */}
        {bookingStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Select Your Seats</h2>
            
            {/* Screen */}
            <div className="mb-8 text-center">
              <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/10 px-8 py-2 rounded-t-3xl">
                <span className="text-lg font-semibold gradient-text">screening here</span>
              </div>
            </div>

            {/* Seat Map */}
            <div className="max-w-6xl mx-auto">
              <div className="space-y-2 mb-8">
                {/* Rows A-I */}
                {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((row) => (
                  <div key={row} className="flex items-center justify-center gap-4">
                    <span className="w-8 text-center font-bold text-muted-foreground">{row}</span>
                    
                    {/* Seats 1-14 */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row && seat.number >= 1 && seat.number <= 14)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                            disabled={seat.status === "booked"}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                    
                    {/* Gap */}
                    <div className="w-8"></div>
                    
                    {/* Seats 15-28 */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row && seat.number >= 15 && seat.number <= 28)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                            disabled={seat.status === "booked"}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                    
                    <span className="w-8 text-center font-bold text-muted-foreground">{row}</span>
                  </div>
                ))}
                
                {/* Rows J-M */}
                {["J", "K", "L", "M"].map((row) => (
                  <div key={row} className="flex items-center justify-center gap-4">
                    <span className="w-8 text-center font-bold text-muted-foreground">{row}</span>
                    
                    {/* Seats 1-4 */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row && seat.number >= 1 && seat.number <= 4)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                            disabled={seat.status === "booked"}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                    
                    {/* Gap */}
                    <div className="w-8"></div>
                    
                    {/* Seats 5-18 */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row && seat.number >= 5 && seat.number <= 18)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                            disabled={seat.status === "booked"}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                    
                    {/* Gap */}
                    <div className="w-8"></div>
                    
                    {/* Seats 19-22 */}
                    <div className="flex gap-1">
                      {seats
                        .filter(seat => seat.row === row && seat.number >= 19 && seat.number <= 22)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                            disabled={seat.status === "booked"}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                    
                    <span className="w-8 text-center font-bold text-muted-foreground">{row}</span>
                  </div>
                ))}
                
                {/* Last Line */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-dashed border-border">
                  <div className="flex gap-1">
                    {seats
                      .filter(seat => seat.row === "LAST")
                      .map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={`w-6 h-6 rounded text-xs font-bold transition-all duration-200 ${getSeatColor(seat)}`}
                          disabled={seat.status === "booked"}
                        >
                          {seat.number}
                        </button>
                      ))}
                  </div>
                  <span className="text-sm text-muted-foreground">last line</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-card border border-border rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span className="text-sm">Booked</span>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
              <div className="card-glow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Selected Seats:</span>
                    <span className="font-semibold">{selectedSeats.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-semibold">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per seat:</span>
                    <span className="font-semibold">₹{event.price}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="gradient-text">₹{totalAmount}</span>
                  </div>
                </div>
                <Button onClick={handleBookingSubmit} className="w-full hero-button">
                  Continue to Customer Details
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Customer Details */}
        {bookingStep === 2 && (
          <div className="max-w-md mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Details</h2>
            
            <div className="card-glow p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Seats: {selectedSeats.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="gradient-text">₹{totalAmount}</span>
                  </div>
                </div>

                <Button onClick={handleBookingSubmit} className="w-full hero-button">
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Confirmation */}
        {bookingStep === 3 && (
          <div className="max-w-md mx-auto animate-fade-in text-center">
            <h2 className="text-3xl font-bold mb-8">Payment & Confirmation</h2>
            
            <div className="card-glow p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span className="font-semibold">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-semibold">{event.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats:</span>
                  <span className="font-semibold">{selectedSeats.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-semibold">{customerInfo.name}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="gradient-text">₹{totalAmount}</span>
                </div>
              </div>

              <Button onClick={handleBookingSubmit} className="w-full hero-button">
                Confirm Booking & Pay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventBooking;