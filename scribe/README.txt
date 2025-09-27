Find command for all relevant files:
find . \
  \( -path "*/node_modules" -o \
     -path "*/.git" -o \
     -path "*/dist" -o \
     -path "*/build" -o \
     -path "*/.next" -o \
     -path "*/venv" -o \
     -path "*/.gradle" -o \
     -path "*/target" -o \
     -path "*/.mvn" -o \
     -path "*/.vscode" -o \
     -name "*.class" -o \
     -name "*.jar" -o \
     -name "*.bin" -o \
     -name "*.lock" -o \
     -name "*.DS_Store" -o \
     -name "*.original" -o \
     -name "*~" -o \
     -name "#*#" \) -prune -o \
  -type f \
  \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o \
     -name "*.java" -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" -o \
     -name "*.html" -o -name "*.css" -o -name "*.scss" -o \
     -name "*.md" -o -name "*.txt" -o \
     -name "pom.xml" -o -name "build.gradle" -o -name "settings.gradle" -o \
     -name "vite.config.ts" -o -name "tailwind.config.js" -o -name "postcss.config.js" \) \
  -print


Starting the app: 
- Run RestServiceApplication.java
- (in a new console):
   - cd frontend
   - npm run dev