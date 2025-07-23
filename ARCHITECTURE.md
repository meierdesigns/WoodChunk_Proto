# Architecture Documentation

## Overview

This project has been restructured from a monolithic architecture to a clean, modular system following modern software engineering best practices. The refactoring improves maintainability, scalability, and code organization.

## Project Structure

```
WoodChunk_Proto/
├── modules/                    # Modular components
│   ├── progress-bar/          # Progress bar web component
│   │   ├── progress-bar.html
│   │   ├── progress-bar.css
│   │   └── progress-bar.js
│   ├── game-core/             # Main game logic
│   │   ├── game-core.html
│   │   ├── game-core.css
│   │   └── game-core.js
│   ├── status-system/         # Status notifications & sidecard
│   │   ├── status-system.html
│   │   ├── status-system.css
│   │   └── status-system.js
│   └── tab-system/            # Tab management
│       ├── tab-system.html
│       ├── tab-system.css
│       └── tab-system.js
├── src/                       # Core game systems
│   ├── server.js             # Express server (port 1337)
│   ├── research.js           # Research system
│   ├── weather.js            # Weather system
│   └── weather.css           # Weather styles
├── index.html                # Main entry point (modular)
├── index-old.html            # Original monolithic version (backup)
├── style.css                 # Global styles
├── arbeitsamt-table.html     # Job office table
├── moebelbau-table.html      # Furniture building table
└── package.json              # Project configuration
```

## Architecture Improvements

### 1. Separation of Concerns ✅
- **Before**: 1,572-line monolithic HTML file with mixed HTML, CSS, and JavaScript
- **After**: Clean separation into dedicated modules with individual HTML, CSS, and JS files

### 2. Modular Structure ✅
- Each major feature is now its own module following the user's modular rules
- Modules are self-contained with their own HTML, CSS, and JavaScript
- Proper kebab-case naming convention implemented

### 3. Server Configuration ✅
- **Before**: Server ran on port 3000
- **After**: Server runs on preferred port 1337 as specified in user rules

### 4. Maintainability Improvements ✅
- Extracted ~800 lines of inline JavaScript into proper modules
- Removed inline CSS templates from HTML
- Implemented proper class-based architecture for game logic
- Clear documentation and comments throughout code

### 5. Modern Best Practices ✅
- ES6+ class syntax for better structure
- Async/await for server communication
- Proper error handling with try-catch blocks
- Event-driven architecture
- Backward compatibility maintained

## Module Details

### Progress Bar Module
- **Purpose**: Custom web component for game progress visualization
- **Location**: `modules/progress-bar/`
- **Features**: Dynamic progress bars with animation and text display

### Game Core Module
- **Purpose**: Central game logic and state management
- **Location**: `modules/game-core/`
- **Features**: 
  - Resource management (wood, gold, trees)
  - Worker management (workers, foresters, carpenters)
  - Auto-collection and auto-upgrade systems
  - Save/load functionality

### Status System Module
- **Purpose**: User notifications and status tracking
- **Location**: `modules/status-system/`
- **Features**:
  - Toast notifications
  - Status sidecard with message history
  - ESC key support for closing

### Tab System Module
- **Purpose**: Tab management for different game sections
- **Location**: `modules/tab-system/`
- **Features**:
  - Dynamic tab loading
  - External content integration
  - Local storage for tab persistence

## Development Workflow

### Starting the Development Server
```bash
npm start
# or
npm run dev
```
Server will start on port 1337 as configured.

### Adding New Modules
1. Create folder in `modules/` directory
2. Add HTML, CSS, and JS files following naming convention
3. Import in main `index.html`
4. Follow the established patterns for initialization

### Code Style Guidelines
- Use kebab-case for file and folder names
- Use camelCase for JavaScript variables and functions
- Use ES6+ class syntax for new components
- Always include proper error handling
- Document complex functions with JSDoc comments

## Performance Considerations

### Load Order
Scripts are loaded in dependency order:
1. Core systems (research, weather)
2. UI components (progress-bar, status-system)
3. Game logic (tab-system, game-core)

### Memory Management
- Game state is centralized in GameCore class
- Automatic cleanup for animations and timers
- Efficient DOM updates to prevent memory leaks

## Future Enhancements

### Recommended Improvements
1. **TypeScript Migration**: Add type safety and better IDE support
2. **Build System**: Implement webpack or similar for bundling
3. **Testing**: Add unit tests for core game logic
4. **API Documentation**: Generate documentation from JSDoc comments
5. **Linting**: Add ESLint for code quality consistency

### Scalability Considerations
- Module system supports easy addition of new features
- Clean separation allows for independent testing
- Server can be extended with additional endpoints
- CSS architecture supports theming and customization

## Troubleshooting

### Common Issues
1. **Module Loading Errors**: Check script order in index.html
2. **Style Conflicts**: Verify CSS module specificity
3. **Save/Load Issues**: Check server connectivity and port 1337
4. **Tab System**: Ensure external table files are accessible

### Debug Mode
Enable browser console to see detailed logging from each module.

---

This architecture provides a solid foundation for long-term maintenance and feature development while maintaining backward compatibility with existing save files and user preferences.