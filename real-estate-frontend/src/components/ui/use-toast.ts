export function useToast() {
  return {
    toast: ({ title, description, variant }: { title: string, description: string, variant?: "default" | "destructive" }) => {
      if (variant === "destructive") {
        console.error(title, description);
        alert(`Error: ${description}`);
      } else {
        console.log(title, description);
        alert(description);
      }
    }
  };
}
