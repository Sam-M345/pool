# 🎱 Simple Pool Game

A responsive web-based pool game built with HTML5 Canvas, JavaScript, and CSS3. Play 8-ball pool with realistic physics, mobile touch support, and smooth animations.

## 🎮 [Play Live Demo](https://sam-m345.github.io/pool)

## ✨ Features

### 🎯 Core Gameplay
- **Realistic Physics**: Accurate ball movement with momentum and friction
- **Smart Collision Detection**: Proper ball-to-ball and wall collisions
- **6 Pockets**: Standard pool table with corner and side pockets
- **Power System**: Visual power indicator with 100% max power (doubled strength)
- **Cue Stick**: Interactive aiming with visual feedback

### 📱 Mobile & Desktop Support
- **Touch Controls**: Full mobile support with touch events
- **Responsive Design**: Adapts to all screen sizes
- **Cross-Platform**: Works on phones, tablets, and desktops
- **Optimized UI**: Touch-friendly buttons and interactions

### 🎨 Visual & UX
- **Smooth Animations**: 60fps gameplay with requestAnimationFrame
- **Gradient Background**: Modern dark theme
- **Numbered Balls**: Traditional pool ball design
- **Anti-Accidental Shots**: Prevents shooting when stick is hidden
- **Drag Distance Validation**: Must drag minimum distance to shoot

## 🎮 How to Play

1. **Aim**: Click and drag (or touch and drag on mobile) from the cue ball
2. **Power**: Drag further away to increase power (0-100%)
3. **Shoot**: Release to shoot the cue ball
4. **Pocket Balls**: Sink balls into the 6 pockets around the table
5. **Reset**: Click the reset button to start a new game

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Structure and canvas element
- **CSS3**: Responsive styling with mobile-first design
- **JavaScript (ES6+)**: Game logic, physics, and interactions
- **Canvas API**: 2D graphics rendering and animations

### Development Tools
- **Python 3**: Local development server
- **Git**: Version control
- **GitHub**: Repository hosting
- **GitHub Pages**: Free static hosting

### APIs Used
- **Touch/Mouse Events**: Cross-device input handling
- **RequestAnimationFrame**: Smooth animations
- **Math API**: Physics calculations and trigonometry

## 🚀 Setup & Development

### Prerequisites
- Python 3.x
- Git
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sam-M345/pool.git
   cd pool
   ```

2. **Run the development server**
   ```bash
   python3 run_game.py
   ```

3. **Open in browser**
   - The game will automatically open at `http://localhost:8000`
   - Or manually navigate to the URL

### Project Structure
```
pool/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS styling
├── game.js             # Core game logic and physics
├── run_game.py         # Development server script
└── README.md           # Project documentation
```

## 📱 Mobile Optimization

- **Touch Events**: Full touch support for mobile devices
- **Responsive Canvas**: Automatically scales to fit screen
- **Viewport Meta Tag**: Proper mobile viewport handling
- **Touch-Friendly UI**: Minimum 44px touch targets
- **Prevented Behaviors**: Disabled text selection and callouts

## 🎯 Game Mechanics

### Physics Engine
- **Friction**: Realistic ball deceleration
- **Momentum**: Proper velocity calculations
- **Collision**: Accurate ball-to-ball physics
- **Boundaries**: Wall collision with energy loss

### Power System
- **Range**: 0-100% power indicator
- **Max Power**: 30 units (doubled from standard)
- **Visual Feedback**: Real-time power percentage display
- **Minimum Drag**: Prevents accidental shots

### Pocket Detection
- **6 Pockets**: Standard pool table layout
- **Collision Radius**: Proper pocket entry detection
- **Ball Removal**: Smooth ball disappearance when pocketed

## 🌐 Deployment

This project is automatically deployed to GitHub Pages:
- **Live URL**: https://sam-m345.github.io/pool
- **Auto-Deploy**: Pushes to `main` branch trigger deployment
- **SSL Enabled**: Secure HTTPS connection
- **Global CDN**: Fast loading worldwide

## 🔧 Development Notes

### Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari (desktop & mobile)
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- **60 FPS Rendering**: Smooth gameplay animations
- **Efficient Collision Detection**: Optimized physics calculations
- **Minimal Dependencies**: Pure vanilla JavaScript
- **Lightweight**: < 10KB total file size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Inspired by classic 8-ball pool games
- Mobile-first responsive design principles
- Physics calculations based on real pool mechanics

---

**[🎮 Play the Game Now!](https://sam-m345.github.io/pool)** 