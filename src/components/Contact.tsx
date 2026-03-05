import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'

export function Contact() {
  const container = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="contact" className="min-h-screen flex items-center py-32 text-center">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="mailto:jeremy@example.com"
              className="group p-4 bg-card/30 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 border border-border/50"
              aria-label="Email Me"
            >
              <Mail className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://github.com/jeremysimwenze"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-card/30 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 border border-border/50"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/jeremysimwenze"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-card/30 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 border border-border/50"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <a 
              href="mailto:jeremy@example.com" 
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Say Hello
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
