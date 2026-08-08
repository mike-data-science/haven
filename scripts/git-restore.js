const { execSync } = require('child_process');
try {
  execSync('git checkout -- components/front/PropertyCard.jsx', { stdio: 'inherit' });
  console.log("Success");
} catch (e) {
  console.error(e.message);
}
