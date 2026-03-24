# 💼 Sumaid Portfolio

A modern, interactive portfolio website built with **Next.js**, **React**, and **Tailwind CSS**. Features smooth animations, responsive design, and a contact form for reaching out.

## 🚀 Features

- **Modern UI/UX** - Sleek, responsive design that works on all devices
- **Smooth Animations** - Powered by Framer Motion for engaging transitions
- **Projects Showcase** - Display your best work with elegant project cards
- **Skills Section** - Highlight your technical expertise
- **Certifications** - Showcase your professional certifications
- **Interactive Contact Form** - Get in touch with visitors directly
- **Matrix Rain Animation** - Eye-catching animated background effect
- **Mobile Navigation** - Optimized mobile menu experience
- **Dark Mode Compatible** - Modern design that works in any theme
- **Terminal Component** - Interactive terminal-style elements for a tech-savvy feel

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.35
- **Frontend**: React 18
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion 11.0.0
- **Email Service**: Resend 6.9.4
- **CSS Processing**: PostCSS & Autoprefixer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumaid365/sumaid-portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view your portfolio

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Deploy to Vercel (Recommended)
The easiest way to deploy your Next.js portfolio is using [Vercel](https://vercel.com):

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Connect your GitHub repository
4. Vercel will automatically detect Next.js and configure build settings
5. Your portfolio will be live!

## 📁 Project Structure

```
portfolio/
├── components/          # Reusable React components
│   ├── NavBar.js       # Navigation bar
│   ├── ProjectCard.js  # Project showcase cards
│   ├── Skills.js       # Skills section
│   ├── Certifications.js # Certifications display
│   ├── ContactForm.js  # Contact form component
│   ├── MatrixBox.js    # Matrix animation
│   ├── Terminal/       # Terminal component
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── _app.js         # App wrapper
│   ├── _document.js    # Custom document
│   └── api/            # API routes
├── styles/             # Global styles
├── public/             # Static assets
├── fonts/              # Custom fonts
├── hooks/              # Custom React hooks
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies
```

## 🎯 Customization

### Update Your Information
- Edit `pages/index.js` to add your personal information
- Update project data in the components
- Modify colors in `tailwind.config.js`

### Add Your Projects
Edit the ProjectCard component data to showcase your work:
```jsx
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    link: "https://project-link.com",
    // ... other properties
  },
  // Add more projects
];
```

### Customize Styling
Tailwind CSS is pre-configured. Modify `tailwind.config.js` to customize:
- Color scheme
- Typography
- Spacing
- Custom utilities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## 📧 Contact Form Setup

The contact form uses **Resend** for email delivery. To set it up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add it to your `.env.local`:
   ```
   NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
   ```
4. Update the API endpoint in `pages/api/` to handle form submissions

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests for any improvements.

## 💡 Tips

- Optimize images for better performance
- Use Next.js Image component for images
- Keep animations performance-friendly
- Test on mobile devices regularly
- Use Vercel Analytics to track portfolio performance

## 🔐 Security

For security best practices, see [SECURITY.md](SECURITY.md)

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Made with ❤️ using Next.js**

