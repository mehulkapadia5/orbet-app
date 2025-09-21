import { MoveUpRight, Clock, Star } from "lucide-react";

function Stats() {
  return (
    <div className="w-full py-5 lg:py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row text-center border rounded-lg overflow-hidden max-w-2xl w-full">
            <div className="flex gap-0 flex-col justify-center items-center p-4 sm:p-6 border-b sm:border-b-0 sm:border-r flex-1">
              <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5 mb-2 sm:mb-3 text-primary" />
              <h2 className="text-2xl sm:text-3xl tracking-tighter font-regular mb-1">
                40%
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed tracking-tight text-muted-foreground">
                Faster Hiring
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-center items-center p-4 sm:p-6 border-b sm:border-b-0 sm:border-r flex-1">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mb-2 sm:mb-3 text-primary" />
              <h2 className="text-2xl sm:text-3xl tracking-tighter font-regular mb-1">
                95%
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed tracking-tight text-muted-foreground">
                Time Saved
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-center items-center p-4 sm:p-6 flex-1">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mb-2 sm:mb-3 text-primary" />
              <h2 className="text-2xl sm:text-3xl tracking-tighter font-regular mb-1">
                4.9★
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed tracking-tight text-muted-foreground">
                User Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Stats };
