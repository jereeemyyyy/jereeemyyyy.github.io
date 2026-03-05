export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="mb-2 md:mb-0">
          &copy; {year} Jeremy Sim Wen Ze. All rights reserved.
        </div>
        <div>
          Designed & Developed by <span className="text-foreground font-medium">Jeremy</span>
        </div>
      </div>
    </footer>
  )
}
