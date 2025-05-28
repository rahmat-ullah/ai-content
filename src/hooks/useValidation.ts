import { useEffect } from 'react';

// Custom hook for accessibility validation
export const useAccessibilityValidation = () => {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === 'development') {
      const validateAccessibility = async () => {
        try {
          // Check for semantic HTML
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const headingLevels = Array.from(headings).map(h => parseInt(h.tagName[1]));
          
          // Check for proper heading hierarchy
          let hasHeadingError = false;
          for (let i = 0; i < headingLevels.length - 1; i++) {
            if (headingLevels[i+1] > headingLevels[i] + 1) {
              console.warn('Accessibility Warning: Heading levels should not skip (e.g., h2 to h4)');
              hasHeadingError = true;
              break;
            }
          }
          
          // Check for alt text on images
          const images = document.querySelectorAll('img');
          let missingAltCount = 0;
          images.forEach(img => {
            if (!img.hasAttribute('alt')) {
              missingAltCount++;
            }
          });
          
          if (missingAltCount > 0) {
            console.warn(`Accessibility Warning: ${missingAltCount} images missing alt text`);
          }
          
          // Check for sufficient color contrast (simplified check)
          const elements = document.querySelectorAll('*');
          let lowContrastCount = 0;
          
          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const bgColor = style.backgroundColor;
            
            // Very simplified contrast check - would use a proper algorithm in production
            if (color === 'rgb(255, 255, 255)' && bgColor === 'rgb(255, 255, 255)') {
              lowContrastCount++;
            }
          });
          
          if (lowContrastCount > 0) {
            console.warn(`Accessibility Warning: Potential low contrast issues detected`);
          }
          
          // Log overall status
          if (!hasHeadingError && missingAltCount === 0 && lowContrastCount === 0) {
            console.log('✅ Basic accessibility checks passed');
          } else {
            console.warn('⚠️ Some accessibility issues detected');
          }
          
        } catch (error) {
          console.error('Error during accessibility validation:', error);
        }
      };
      
      // Run validation after initial render
      const timeoutId = setTimeout(validateAccessibility, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);
};

// Custom hook for Core Web Vitals monitoring
export const useCoreWebVitals = () => {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === 'development') {
      const reportWebVitals = async () => {
        try {
          // Check if the browser supports the Web Vitals API
          const webVitals = await import('web-vitals');
          
          if (webVitals) {
            webVitals.onCLS((metric: { value: number }) => {
              console.log(`CLS: ${metric.value}`);
              if (metric.value > 0.1) {
                console.warn('⚠️ CLS exceeds recommended threshold (should be < 0.1)');
              } else {
                console.log('✅ CLS within recommended threshold');
              }
            });
            
            webVitals.onINP((metric: { value: number }) => {
              console.log(`INP: ${metric.value}ms`);
              if (metric.value > 200) {
                console.warn('⚠️ INP exceeds recommended threshold (should be < 200ms)');
              } else {
                console.log('✅ INP within recommended threshold');
              }
            });
            
            webVitals.onLCP((metric: { value: number }) => {
              console.log(`LCP: ${metric.value}ms`);
              if (metric.value > 2500) {
                console.warn('⚠️ LCP exceeds recommended threshold (should be < 2.5s)');
              } else {
                console.log('✅ LCP within recommended threshold');
              }
            });
          } else {
            console.log('Web Vitals API not supported in this browser');
          }
        } catch (error) {
          console.error('Error monitoring Core Web Vitals:', error);
        }
      };
      
      // Run after page load
      window.addEventListener('load', reportWebVitals);
      return () => window.removeEventListener('load', reportWebVitals);
    }
  }, []);
};

// Custom hook for responsive design validation
export const useResponsivenessValidation = () => {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === 'development') {
      const checkResponsiveness = () => {
        try {
          console.log('Checking responsive design...');
          
          // Check for viewport meta tag
          const viewportMeta = document.querySelector('meta[name="viewport"]');
          if (!viewportMeta) {
            console.warn('⚠️ Viewport meta tag missing');
          } else {
            console.log('✅ Viewport meta tag present');
          }
          
          // Check for horizontal overflow
          const bodyWidth = document.body.offsetWidth;
          const windowWidth = window.innerWidth;
          
          if (bodyWidth > windowWidth) {
            console.warn('⚠️ Horizontal overflow detected - page wider than viewport');
          } else {
            console.log('✅ No horizontal overflow detected');
          }
          
          // Check for touch targets
          const smallButtons: Element[] = [];
          const buttons = document.querySelectorAll('button, a, [role="button"]');
          
          buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
              smallButtons.push(button);
            }
          });
          
          if (smallButtons.length > 0) {
            console.warn(`⚠️ ${smallButtons.length} interactive elements may be too small for touch targets (should be at least 44x44px)`);
          } else {
            console.log('✅ Interactive elements have adequate size for touch targets');
          }
          
        } catch (error) {
          console.error('Error during responsiveness validation:', error);
        }
      };
      
      // Run validation after initial render
      const timeoutId = setTimeout(checkResponsiveness, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);
};

// Combined validation hook
export const useValidation = () => {
  useAccessibilityValidation();
  useCoreWebVitals();
  useResponsivenessValidation();
};
