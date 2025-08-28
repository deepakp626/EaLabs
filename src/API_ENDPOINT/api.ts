
// Fetch all packages
async function fetchPackages() {
  try {
    const packages = await checkupPackagesApi.getAll();
    console.log(packages);
  } catch (error) {
    console.error('Failed to fetch packages:', error);
  }1
}

// Create a new package
async function createPackage(newPackage) {
  try {
    const createdPackage = await checkupPackagesApi.create(newPackage);
    console.log('Created package:', createdPackage);
  } catch (error) {
    console.error('Failed to create package:', error);
  }
}

// Update a package
async function updatePackage(id, updatedPackage) {
  try {
    const updated = await checkupPackagesApi.update(id, updatedPackage);
    console.log('Updated package:', updated);
  } catch (error) {
    console.error('Failed to update package:', error);
  }
}

// Delete a package
async function deletePackage(id) {
  try {
    await checkupPackagesApi.delete(id);
    console.log('Package deleted successfully');
  } catch (error) {
    console.error('Failed to delete package:', error);
  }
}