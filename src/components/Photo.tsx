import profilePhoto from "@/assets/profile-photo.png";

export const Photo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl animate-pulse-glow" />
        <img
          src={profilePhoto}
          alt="Sai Krishna Mahankali"
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary/30 shadow-[0_0_30px_rgba(14,165,233,0.4)]"
        />
      </div>
    </div>
  );
};
