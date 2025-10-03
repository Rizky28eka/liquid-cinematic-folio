#!/bin/bash

# This script fixes all ease type issues in the codebase
# Convert ease: 'easeOut' to ease: [0.76, 0, 0.24, 1] as const
# Convert ease: 'easeInOut' to ease: [0.76, 0, 0.24, 1] as const
# Convert ease: 'backOut' to ease: [0.34, 1.56, 0.64, 1] as const

find src -type f -name "*.tsx" -exec sed -i "s/ease: 'easeOut'/ease: [0.76, 0, 0.24, 1] as const/g" {} \;
find src -type f -name "*.tsx" -exec sed -i "s/ease: 'easeInOut'/ease: [0.76, 0, 0.24, 1] as const/g" {} \;
find src -type f -name "*.tsx" -exec sed -i "s/ease: 'backOut'/ease: [0.34, 1.56, 0.64, 1] as const/g" {} \;
find src -type f -name "*.tsx" -exec sed -i 's/ease: "easeOut"/ease: [0.76, 0, 0.24, 1] as const/g' {} \;
find src -type f -name "*.tsx" -exec sed -i 's/ease: "easeInOut"/ease: [0.76, 0, 0.24, 1] as const/g' {} \;
find src -type f -name "*.tsx" -exec sed -i 's/ease: "backOut"/ease: [0.34, 1.56, 0.64, 1] as const/g' {} \;

echo "All easing functions have been fixed!"
