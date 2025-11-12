// License Management System Script

// Sample API data (simulating fetch from API)
const licenseData = {
    "count": 6,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1584723961091234,
            "upgrade_from": [],
            "product_features": [
                {
                    "id": 171,
                    "created_at": "2020-08-26T05:36:46Z",
                    "updated_at": "2020-08-26T05:36:46Z",
                    "name": "Feature 1",
                    "code": "f1",
                    "is_deleted": false,
                    "feature_type": "activation",
                    "max_consumption": 0,
                    "allow_overages": false,
                    "max_overages": 0,
                    "reset_consumption": false,
                    "consumption_period": null
                },
                {
                    "id": 172,
                    "created_at": "2020-08-26T05:37:14Z",
                    "updated_at": "2020-08-26T05:37:14Z",
                    "name": "Feature 2",
                    "code": "f2",
                    "is_deleted": false,
                    "feature_type": "consumption",
                    "max_consumption": 20,
                    "allow_overages": false,
                    "max_overages": 0,
                    "reset_consumption": false,
                    "consumption_period": null,
                    "metadata": {},
                },
                {
                    "id": 173,
                    "created_at": "2020-09-14T11:17:43Z",
                    "updated_at": "2020-09-14T11:17:43Z",
                    "name": "Feature 3",
                    "code": "f3",
                    "is_deleted": false,
                    "feature_type": "consumption",
                    "max_consumption": 2,
                    "allow_overages": false,
                    "max_overages": 0,
                    "reset_consumption": false,
                    "consumption_period": null,
                    "metadata": {},
                },
                {
                    "id": 189,
                    "created_at": "2020-11-13T07:40:53Z",
                    "updated_at": "2020-11-13T07:40:53Z",
                    "name": "Feature 5",
                    "code": "f5",
                    "is_deleted": false,
                    "feature_type": "activation",
                    "max_consumption": 0,
                    "allow_overages": false,
                    "max_overages": 0,
                    "reset_consumption": false,
                    "consumption_period": null,
                    "metadata": {},
                }
            ],
            "custom_fields": [
                {
                    "id": 51,
                    "name": "Some key",
                    "data_type": null,
                    "default_value": "1234",
                    "description": null
                },
                {
                    "id": 60,
                    "name": "test_name",
                    "data_type": null,
                    "default_value": "123",
                    "description": null
                },
                {
                    "id": 61,
                    "name": "Key with space",
                    "data_type": null,
                    "default_value": "123",
                    "description": null
                }
            ],
            "installation_files": [
                {
                    "id": 733282,
                    "created_at": "2020-10-13T09:15:22Z",
                    "updated_at": "2020-10-13T09:15:22Z",
                    "version": "0.1",
                    "full_link": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "filename": "dummy.pdf",
                    "release_date": "2020-10-09",
                    "enabled": true,
                    "hash_md5": "",
                    "environment": "linux"
                },
                {
                    "id": 733283,
                    "created_at": "2020-10-13T09:15:52Z",
                    "updated_at": "2020-10-13T09:15:52Z",
                    "version": "0.2",
                    "full_link": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "filename": "dummy.pdf",
                    "release_date": "2020-10-10",
                    "enabled": true,
                    "hash_md5": "sonotahash",
                    "environment": "linux"
                }
            ],
            "created_at": "2020-07-03T13:05:25Z",
            "updated_at": "2020-07-07T12:35:05Z",
            "product_name": "mch",
            "short_code": "mch",
            "active": true,
            "valid_duration": "",
            "allow_trial": false,
            "trial_days": 0,
            "max_activations": 1,
            "hardware_id_required": false,
            "is_upgrade": false,
            "subscription_duration": "",
            "enable_maintenance_period": false,
            "maintenance_duration": "",
            "is_floating": true,
            "is_floating_cloud": false,
            "floating_users": 12,
            "floating_timeout": 120,
            "default_license_type": "perpetual",
            "is_user_locked": false,
            "is_node_locked": true,
            "max_consumptions": 1,
            "authorization_method": "user",
            "prevent_vm": false,
            "allow_overages": false,
            "max_overages": 0,
            "reset_consumption": false,
            "consumption_period": null,
            "is_archived": false,
            "metadata": {},
            "company": 277
        }
        // Add more license objects here if needed
    ]
};

// Function to render license cards
function renderLicenses(licenses) {
    const container = document.getElementById('licenses-container');
    container.innerHTML = '';

    licenses.forEach(license => {
        const card = document.createElement('div');
        card.className = 'license-card';

        card.innerHTML = `
            <div class="license-header">
                <div class="license-name">${license.product_name}</div>
                <div class="license-code">Code: ${license.short_code}</div>
            </div>
            <div class="license-details">
                <div class="detail-item">
                    <span class="detail-label">Active:</span>
                    <span class="detail-value">${license.active ? 'Yes' : 'No'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">License Type:</span>
                    <span class="detail-value">${license.default_license_type}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Max Activations:</span>
                    <span class="detail-value">${license.max_activations}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Floating Users:</span>
                    <span class="detail-value">${license.floating_users}</span>
                </div>
            </div>
            <div class="features-section">
                <div class="section-title">Product Features</div>
                <ul class="features-list">
                    ${license.product_features.map(feature => `
                        <li class="feature-item">
                            <strong>${feature.name}</strong> (${feature.feature_type}) - Max: ${feature.max_consumption || 'Unlimited'}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="custom-fields-section">
                <div class="section-title">Custom Fields</div>
                <ul class="custom-fields-list">
                    ${license.custom_fields.map(field => `
                        <li class="custom-field-item">
                            <strong>${field.name}:</strong> ${field.default_value}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="installation-files-section">
                <div class="section-title">Installation Files</div>
                <ul class="installation-files-list">
                    ${license.installation_files.map(file => `
                        <li class="installation-file-item">
                            <strong>${file.filename}</strong> v${file.version} (${file.environment}) - <a href="${file.full_link}" target="_blank">Download</a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        container.appendChild(card);
    });
}

// Simulate API fetch (using sample data)
function fetchLicenses() {
    // In a real scenario, this would be:
    // fetch('https://api.example.com/licenses')
    //     .then(response => response.json())
    //     .then(data => renderLicenses(data.results))
    //     .catch(error => console.error('Error fetching licenses:', error));

    // For now, use sample data
    renderLicenses(licenseData.results);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchLicenses);