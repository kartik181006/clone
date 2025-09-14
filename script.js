// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ Toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').classList.remove('active');
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// AI Legal Assistant
async function getLegalAdvice() {
    const query = document.getElementById('legalQuery').value.trim();
    const responseDiv = document.getElementById('legalResponse');
    
    if (!query) {
        alert('Please enter your legal question.');
        return;
    }
    
    responseDiv.innerHTML = '<div class="loading"></div> Analyzing your legal issue...';
    responseDiv.style.display = 'block';
    
    // Simulate AI response (in real implementation, this would call an AI API)
    setTimeout(() => {
        const advice = generateLegalAdvice(query);
        responseDiv.innerHTML = `
            <div class="ai-response-content">
                <h4>Legal Guidance:</h4>
                <p>${advice.analysis}</p>
                <h5>Recommended Steps:</h5>
                <ol>
                    ${advice.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
                <h5>Important Notes:</h5>
                <ul>
                    ${advice.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
                <div class="disclaimer">
                    <strong>Disclaimer:</strong> This is for informational purposes only. Please consult a qualified legal professional for your specific case.
                </div>
            </div>
        `;
    }, 2000);
}

// Generate legal advice based on query
function generateLegalAdvice(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('landlord') || lowerQuery.includes('tenant') || lowerQuery.includes('security deposit')) {
        return {
            analysis: "This appears to be a landlord-tenant dispute. In India, such disputes are governed by state-specific rent control laws and the Transfer of Property Act, 1882.",
            steps: [
                "Send a formal written notice to your landlord demanding the return of your security deposit",
                "Check your rental agreement for specific terms regarding security deposit refund",
                "File a complaint with the Rent Control Court in your jurisdiction",
                "Gather evidence: rental agreement, payment receipts, photos of property condition",
                "Consider mediation through consumer forums or legal aid services"
            ],
            notes: [
                "Security deposits must be returned within 30 days of vacating (varies by state)",
                "Landlord can deduct for damages beyond normal wear and tear",
                "Keep all communication in writing",
                "Time limit for filing: 3 years from the date of cause of action"
            ]
        };
    } else if (lowerQuery.includes('consumer') || lowerQuery.includes('defect') || lowerQuery.includes('refund')) {
        return {
            analysis: "This seems to be a consumer rights issue. In India, consumer disputes are handled under the Consumer Protection Act, 2019.",
            steps: [
                "File a complaint with the District Consumer Disputes Redressal Commission",
                "Gather evidence: purchase receipt, product photos, correspondence with seller",
                "Send a legal notice to the seller/company",
                "Consider alternative dispute resolution through mediation",
                "If unsatisfied, appeal to State Commission within 30 days"
            ],
            notes: [
                "Consumer complaints can be filed online through e-daakhil portal",
                "No court fees for claims up to ₹1 lakh",
                "Time limit: 2 years from the date of cause of action",
                "Compensation can include refund, replacement, and damages"
            ]
        };
    } else {
        return {
            analysis: "Based on your query, this appears to be a civil legal matter. The specific course of action depends on the nature of your dispute.",
            steps: [
                "Identify the specific legal issue and applicable laws",
                "Gather all relevant documents and evidence",
                "Send a legal notice to the opposing party",
                "Consider alternative dispute resolution (mediation/arbitration)",
                "File a civil suit in the appropriate court if necessary"
            ],
            notes: [
                "Most civil cases have a 3-year limitation period",
                "Court fees vary based on the claim amount",
                "Consider hiring a qualified lawyer for complex matters",
                "Keep all communication and evidence properly documented"
            ]
        };
    }
}

// Business License Requirements
async function getLicenseRequirements() {
    const businessType = document.getElementById('businessType').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const resultsDiv = document.getElementById('licenseResults');
    
    if (!businessType || !state) {
        alert('Please select both business type and state.');
        return;
    }
    
    resultsDiv.innerHTML = '<div class="loading"></div> Finding license requirements...';
    
    // Simulate API call
    setTimeout(() => {
        const requirements = generateLicenseRequirements(businessType, state, city);
        resultsDiv.innerHTML = `
            <h3>License Requirements for ${businessType.replace('-', ' ').toUpperCase()} in ${state.toUpperCase()}</h3>
            <div class="requirements-grid">
                ${requirements.map(req => `
                    <div class="license-card">
                        <h4>${req.name}</h4>
                        <p><strong>Authority:</strong> ${req.authority}</p>
                        <p><strong>Eligibility:</strong> ${req.eligibility}</p>
                        <p><strong>Documents Required:</strong> ${req.documents}</p>
                        <p><strong>Application Process:</strong> ${req.process}</p>
                        <p><strong>Fees:</strong> ${req.fees}</p>
                        <p><strong>Validity:</strong> ${req.validity}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }, 1500);
}

// Generate license requirements based on business type and state
function generateLicenseRequirements(businessType, state, city) {
    const requirements = {
        'food-stall': [
            {
                name: 'FSSAI License/Registration',
                authority: 'Food Safety and Standards Authority of India',
                eligibility: 'Basic registration for turnover < ₹12 lakhs, License for higher turnover',
                documents: 'PAN, Aadhaar, Address proof, Food safety plan, NOC from local authority',
                process: 'Online application through FSSAI portal, inspection, approval',
                fees: '₹100 for basic registration, ₹2000-5000 for license',
                validity: '1-5 years depending on license type'
            },
            {
                name: 'Trade License',
                authority: 'Municipal Corporation/Local Authority',
                eligibility: 'Any commercial food business',
                documents: 'Property documents, NOC from fire department, health certificate',
                process: 'Apply to local municipal office with required documents',
                fees: '₹500-2000 annually',
                validity: '1 year, renewable'
            }
        ],
        'beauty-parlour': [
            {
                name: 'Trade License',
                authority: 'Municipal Corporation',
                eligibility: 'Commercial beauty services',
                documents: 'Property documents, health department clearance, fire NOC',
                process: 'Apply to local municipal office',
                fees: '₹1000-3000 annually',
                validity: '1 year'
            },
            {
                name: 'Shops & Establishments Registration',
                authority: 'State Labour Department',
                eligibility: 'All commercial establishments',
                documents: 'Business registration, address proof, employee details',
                process: 'Online/offline application to labour department',
                fees: '₹500-1500',
                validity: '1 year'
            }
        ],
        'online-retailer': [
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'Turnover > ₹20 lakhs (₹10 lakhs for special states)',
                documents: 'PAN, Aadhaar, bank details, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees for registration',
                validity: 'Permanent (unless cancelled)'
            },
            {
                name: 'Udyam Registration (MSME)',
                authority: 'Ministry of MSME',
                eligibility: 'Micro, Small, Medium Enterprises',
                documents: 'PAN, Aadhaar, business details',
                process: 'Online self-declaration',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'pharmacy': [
            {
                name: 'Drug License',
                authority: 'State Drug Control Department',
                eligibility: 'Qualified pharmacist, proper storage facilities',
                documents: 'Pharmacist degree, property documents, storage plan, NOC from health department',
                process: 'Apply to state drug control office, inspection, approval',
                fees: '₹2000-5000',
                validity: '1-3 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All pharmaceutical businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'gym-fitness': [
            {
                name: 'Trade License',
                authority: 'Municipal Corporation',
                eligibility: 'Commercial fitness services',
                documents: 'Property documents, fire NOC, health department clearance',
                process: 'Apply to local municipal office',
                fees: '₹2000-5000 annually',
                validity: '1 year'
            },
            {
                name: 'Professional Tax Registration',
                authority: 'State Tax Department',
                eligibility: 'All commercial establishments with employees',
                documents: 'Business registration, employee details',
                process: 'Online/offline application',
                fees: '₹200-500 per employee',
                validity: '1 year'
            }
        ],
        'hospital-clinic': [
            {
                name: 'Clinical Establishment License',
                authority: 'State Health Department',
                eligibility: 'Qualified medical professionals, proper facilities',
                documents: 'Medical degrees, property documents, equipment list, NOC from fire department',
                process: 'Apply to state health department, inspection, approval',
                fees: '₹5000-15000',
                validity: '1-3 years'
            },
            {
                name: 'Drug License (if dispensing medicines)',
                authority: 'State Drug Control Department',
                eligibility: 'Qualified pharmacist for dispensing',
                documents: 'Pharmacist degree, storage facilities plan',
                process: 'Apply to drug control office',
                fees: '₹2000-5000',
                validity: '1-3 years'
            }
        ],
        'school-education': [
            {
                name: 'Recognition Certificate',
                authority: 'State Education Department',
                eligibility: 'Qualified teachers, proper infrastructure, curriculum compliance',
                documents: 'Teacher qualifications, infrastructure details, curriculum plan, NOC from fire department',
                process: 'Apply to education department, inspection, approval',
                fees: '₹5000-10000',
                validity: '3-5 years'
            },
            {
                name: 'Society/Trust Registration',
                authority: 'Registrar of Societies/Trusts',
                eligibility: 'Educational institutions must be registered',
                documents: 'Society/trust deed, member details, objectives',
                process: 'Apply to registrar office',
                fees: '₹1000-3000',
                validity: 'Permanent'
            }
        ],
        'transport-logistics': [
            {
                name: 'Goods Carriage Permit',
                authority: 'Regional Transport Office (RTO)',
                eligibility: 'Valid driving license, vehicle registration',
                documents: 'Driving license, vehicle RC, fitness certificate, insurance',
                process: 'Apply to RTO with vehicle documents',
                fees: '₹2000-5000',
                validity: '1 year'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All transport businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'real-estate': [
            {
                name: 'RERA Registration',
                authority: 'Real Estate Regulatory Authority',
                eligibility: 'Real estate developers and agents',
                documents: 'Project details, financial statements, technical approvals',
                process: 'Apply to state RERA authority',
                fees: '₹50000-200000',
                validity: '5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All real estate businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'insurance': [
            {
                name: 'IRDAI License',
                authority: 'Insurance Regulatory and Development Authority',
                eligibility: 'Qualified insurance agents, proper training',
                documents: 'Agent qualification, training certificates, NOC from insurance company',
                process: 'Apply to IRDAI through insurance company',
                fees: '₹500-2000',
                validity: '3 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All insurance businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'banking-finance': [
            {
                name: 'RBI License',
                authority: 'Reserve Bank of India',
                eligibility: 'Minimum capital requirements, qualified management',
                documents: 'Capital proof, management qualifications, business plan',
                process: 'Apply to RBI, detailed scrutiny, approval',
                fees: '₹50000-500000',
                validity: 'Permanent (with conditions)'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All financial services',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'it-software': [
            {
                name: 'STPI Registration',
                authority: 'Software Technology Parks of India',
                eligibility: 'Software development and IT services',
                documents: 'Company registration, project details, technical specifications',
                process: 'Apply to STPI office, inspection, approval',
                fees: '₹10000-50000',
                validity: '5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All IT services',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'construction': [
            {
                name: 'Builder License',
                authority: 'State Housing Department',
                eligibility: 'Qualified engineers, financial capability',
                documents: 'Engineer qualifications, financial statements, project details',
                process: 'Apply to housing department, inspection, approval',
                fees: '₹25000-100000',
                validity: '3-5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All construction businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'garage-automobile': [
            {
                name: 'Automobile Service License',
                authority: 'State Transport Department',
                eligibility: 'Qualified mechanics, proper equipment',
                documents: 'Mechanic qualifications, equipment list, property documents',
                process: 'Apply to transport department, inspection, approval',
                fees: '₹5000-15000',
                validity: '1-3 years'
            },
            {
                name: 'Trade License',
                authority: 'Municipal Corporation',
                eligibility: 'Commercial automobile services',
                documents: 'Property documents, fire NOC, health clearance',
                process: 'Apply to municipal office',
                fees: '₹2000-5000 annually',
                validity: '1 year'
            }
        ],
        'hotel-hospitality': [
            {
                name: 'Hotel License',
                authority: 'State Tourism Department',
                eligibility: 'Proper facilities, safety measures, qualified staff',
                documents: 'Property documents, safety certificates, staff qualifications',
                process: 'Apply to tourism department, inspection, approval',
                fees: '₹10000-50000',
                validity: '1-3 years'
            },
            {
                name: 'FSSAI License',
                authority: 'Food Safety and Standards Authority of India',
                eligibility: 'Food service in hotels',
                documents: 'Food safety plan, kitchen facilities, staff health certificates',
                process: 'Apply to FSSAI, inspection, approval',
                fees: '₹2000-10000',
                validity: '1-5 years'
            }
        ],
        'entertainment': [
            {
                name: 'Entertainment License',
                authority: 'State Entertainment Department',
                eligibility: 'Proper venue, safety measures, content compliance',
                documents: 'Venue details, safety certificates, content clearance',
                process: 'Apply to entertainment department, inspection, approval',
                fees: '₹5000-25000',
                validity: '1-3 years'
            },
            {
                name: 'Music License',
                authority: 'Indian Performing Right Society (IPRS)',
                eligibility: 'Playing copyrighted music',
                documents: 'Venue details, music usage plan',
                process: 'Apply to IPRS',
                fees: '₹5000-20000 annually',
                validity: '1 year'
            }
        ],
        'agriculture': [
            {
                name: 'Agricultural License',
                authority: 'State Agriculture Department',
                eligibility: 'Agricultural activities, proper land use',
                documents: 'Land documents, agricultural plan, water source proof',
                process: 'Apply to agriculture department',
                fees: '₹1000-5000',
                validity: '3-5 years'
            },
            {
                name: 'GST Registration (if applicable)',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'Agricultural businesses with turnover > threshold',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'textile-garments': [
            {
                name: 'Textile License',
                authority: 'State Textile Department',
                eligibility: 'Textile manufacturing or trading',
                documents: 'Manufacturing plan, equipment details, quality standards',
                process: 'Apply to textile department, inspection, approval',
                fees: '₹5000-20000',
                validity: '3-5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All textile businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'jewelry-gems': [
            {
                name: 'Jewelry License',
                authority: 'State Industries Department',
                eligibility: 'Jewelry manufacturing or trading',
                documents: 'Business plan, security measures, quality standards',
                process: 'Apply to industries department, inspection, approval',
                fees: '₹10000-50000',
                validity: '3-5 years'
            },
            {
                name: 'Hallmarking License',
                authority: 'Bureau of Indian Standards (BIS)',
                eligibility: 'Gold jewelry manufacturing',
                documents: 'Manufacturing details, quality control measures',
                process: 'Apply to BIS, inspection, approval',
                fees: '₹25000-100000',
                validity: '3 years'
            }
        ],
        'electronics': [
            {
                name: 'Electronics License',
                authority: 'State Electronics Department',
                eligibility: 'Electronics manufacturing or trading',
                documents: 'Technical specifications, quality standards, safety measures',
                process: 'Apply to electronics department, inspection, approval',
                fees: '₹5000-25000',
                validity: '3-5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All electronics businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ],
        'pharmaceuticals': [
            {
                name: 'Drug Manufacturing License',
                authority: 'State Drug Control Department',
                eligibility: 'Qualified pharmacists, proper facilities, GMP compliance',
                documents: 'Pharmacist qualifications, facility details, GMP compliance proof',
                process: 'Apply to drug control department, inspection, approval',
                fees: '₹50000-200000',
                validity: '3-5 years'
            },
            {
                name: 'GST Registration',
                authority: 'Central Board of Indirect Taxes and Customs',
                eligibility: 'All pharmaceutical businesses',
                documents: 'PAN, Aadhaar, business address proof',
                process: 'Online registration through GST portal',
                fees: 'No fees',
                validity: 'Permanent'
            }
        ]
    };
    
    return requirements[businessType] || [
        {
            name: 'General Business License',
            authority: 'Local Municipal Authority',
            eligibility: 'All commercial businesses',
            documents: 'PAN, Aadhaar, address proof, business plan',
            process: 'Apply to local municipal office',
            fees: '₹1000-5000',
            validity: '1 year'
        }
    ];
}

// Chatbot functionality
function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesDiv = document.getElementById('chatbotMessages');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function generateChatbotResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('fssai') || lowerQuery.includes('food license')) {
        return "For FSSAI license: If your turnover is less than ₹12 lakhs, you need basic FSSAI registration (₹100). For higher turnover, you need a full FSSAI license (₹2000-5000). Apply online through the FSSAI portal with your PAN, Aadhaar, and business documents.";
    } else if (lowerQuery.includes('beauty parlour') || lowerQuery.includes('salon')) {
        return "For a beauty parlour, you typically need: 1) Trade License from Municipal Corporation, 2) Shops & Establishments Registration, 3) Health Department clearance, 4) GST registration if turnover > ₹20 lakhs. Fees range from ₹1000-3000 annually.";
    } else if (lowerQuery.includes('pharmacy') || lowerQuery.includes('chemist')) {
        return "For a pharmacy, you need: 1) Drug License from State Drug Control Department (₹2000-5000), 2) Qualified pharmacist degree, 3) Proper storage facilities, 4) GST registration. The process involves inspection and approval from health authorities.";
    } else if (lowerQuery.includes('gym') || lowerQuery.includes('fitness')) {
        return "For a gym/fitness center, you need: 1) Trade License from Municipal Corporation (₹2000-5000), 2) Professional Tax Registration, 3) Fire NOC, 4) Health Department clearance, 5) GST registration if turnover > ₹20 lakhs.";
    } else if (lowerQuery.includes('hospital') || lowerQuery.includes('clinic')) {
        return "For a hospital/clinic, you need: 1) Clinical Establishment License from State Health Department (₹5000-15000), 2) Qualified medical professionals, 3) Proper facilities and equipment, 4) Drug License if dispensing medicines, 5) GST registration.";
    } else if (lowerQuery.includes('school') || lowerQuery.includes('education')) {
        return "For a school/educational institution, you need: 1) Recognition Certificate from State Education Department (₹5000-10000), 2) Society/Trust Registration, 3) Qualified teachers, 4) Proper infrastructure, 5) Fire NOC, 6) GST registration if applicable.";
    } else if (lowerQuery.includes('transport') || lowerQuery.includes('logistics')) {
        return "For transport/logistics business, you need: 1) Goods Carriage Permit from RTO (₹2000-5000), 2) Valid driving license, 3) Vehicle registration, 4) GST registration, 5) Insurance coverage. The process involves vehicle inspection and documentation.";
    } else if (lowerQuery.includes('real estate') || lowerQuery.includes('property')) {
        return "For real estate business, you need: 1) RERA Registration (₹50000-200000), 2) Project details and financial statements, 3) Technical approvals, 4) GST registration, 5) Builder license from State Housing Department.";
    } else if (lowerQuery.includes('insurance')) {
        return "For insurance business, you need: 1) IRDAI License (₹500-2000), 2) Qualified insurance agent training, 3) NOC from insurance company, 4) GST registration, 5) Professional tax registration.";
    } else if (lowerQuery.includes('banking') || lowerQuery.includes('finance')) {
        return "For banking/finance business, you need: 1) RBI License (₹50000-500000), 2) Minimum capital requirements, 3) Qualified management, 4) GST registration, 5) Various regulatory compliances.";
    } else if (lowerQuery.includes('it') || lowerQuery.includes('software')) {
        return "For IT/software business, you need: 1) STPI Registration (₹10000-50000), 2) Company registration, 3) Project details, 4) GST registration, 5) Professional tax registration. Special incentives available for IT businesses.";
    } else if (lowerQuery.includes('construction') || lowerQuery.includes('builder')) {
        return "For construction business, you need: 1) Builder License from State Housing Department (₹25000-100000), 2) Qualified engineers, 3) Financial capability proof, 4) GST registration, 5) Various technical approvals.";
    } else if (lowerQuery.includes('garage') || lowerQuery.includes('automobile')) {
        return "For garage/automobile business, you need: 1) Automobile Service License from State Transport Department (₹5000-15000), 2) Qualified mechanics, 3) Proper equipment, 4) Trade License, 5) GST registration.";
    } else if (lowerQuery.includes('hotel') || lowerQuery.includes('hospitality')) {
        return "For hotel/hospitality business, you need: 1) Hotel License from State Tourism Department (₹10000-50000), 2) FSSAI License for food service, 3) Safety certificates, 4) GST registration, 5) Professional tax registration.";
    } else if (lowerQuery.includes('entertainment') || lowerQuery.includes('event')) {
        return "For entertainment/event business, you need: 1) Entertainment License from State Entertainment Department (₹5000-25000), 2) Music License from IPRS, 3) Venue safety certificates, 4) GST registration, 5) Content clearance.";
    } else if (lowerQuery.includes('agriculture') || lowerQuery.includes('farming')) {
        return "For agriculture/farming business, you need: 1) Agricultural License from State Agriculture Department (₹1000-5000), 2) Land documents, 3) Water source proof, 4) GST registration if applicable, 5) Various agricultural clearances.";
    } else if (lowerQuery.includes('textile') || lowerQuery.includes('garments')) {
        return "For textile/garments business, you need: 1) Textile License from State Textile Department (₹5000-20000), 2) Manufacturing plan, 3) Quality standards compliance, 4) GST registration, 5) Professional tax registration.";
    } else if (lowerQuery.includes('jewelry') || lowerQuery.includes('gems')) {
        return "For jewelry/gems business, you need: 1) Jewelry License from State Industries Department (₹10000-50000), 2) Hallmarking License from BIS, 3) Security measures, 4) GST registration, 5) Professional tax registration.";
    } else if (lowerQuery.includes('electronics') || lowerQuery.includes('electrical')) {
        return "For electronics/electrical business, you need: 1) Electronics License from State Electronics Department (₹5000-25000), 2) Technical specifications, 3) Safety measures, 4) GST registration, 5) Professional tax registration.";
    } else if (lowerQuery.includes('pharmaceuticals') || lowerQuery.includes('drugs')) {
        return "For pharmaceuticals business, you need: 1) Drug Manufacturing License from State Drug Control Department (₹50000-200000), 2) Qualified pharmacists, 3) GMP compliance, 4) GST registration, 5) Various regulatory approvals.";
    } else if (lowerQuery.includes('gst') || lowerQuery.includes('tax')) {
        return "GST registration is mandatory if your business turnover exceeds ₹20 lakhs (₹10 lakhs for special category states). You can register online through the GST portal for free. You'll need PAN, Aadhaar, bank details, and business address proof.";
    } else if (lowerQuery.includes('time limit') || lowerQuery.includes('limitation')) {
        return "Most civil cases have a 3-year limitation period from when the cause of action arose. However, this varies: contract disputes (3 years), property disputes (12 years), recovery of money (3 years). Always consult a lawyer for specific cases as there are many exceptions.";
    } else if (lowerQuery.includes('employment') || lowerQuery.includes('labor')) {
        return "Employment disputes involve wage disputes, wrongful termination, workplace harassment, and labor law violations. These are handled by Labor Courts and Industrial Tribunals. Most employment disputes have a 3-year limitation period.";
    } else if (lowerQuery.includes('family') || lowerQuery.includes('divorce')) {
        return "Family law disputes involve marriage, divorce, custody, maintenance, and domestic violence. These are handled by Family Courts and District Courts. Most family law matters have a 3-year limitation period, but some have longer periods.";
    } else if (lowerQuery.includes('criminal') || lowerQuery.includes('bail')) {
        return "Criminal law matters involve offenses against the state and society. These are handled by Magistrate Courts, Sessions Courts, and High Courts. Legal aid is available for those who cannot afford legal representation.";
    } else if (lowerQuery.includes('banking') || lowerQuery.includes('loan')) {
        return "Banking disputes involve issues with banks, financial institutions, loans, and credit cards. These are handled by Banking Ombudsman and Consumer Forums. Banking disputes have a 3-year limitation period.";
    } else if (lowerQuery.includes('motor') || lowerQuery.includes('accident')) {
        return "Motor vehicle disputes involve accidents, insurance claims, and traffic violations. These are handled by Motor Accidents Claims Tribunal and Traffic Courts. Accident claims have a 3-year limitation period from the date of accident.";
    } else if (lowerQuery.includes('medical') || lowerQuery.includes('negligence')) {
        return "Medical negligence cases involve claims against healthcare providers for substandard care. These are handled by Consumer Forums and Civil Courts. Medical negligence cases have a 3-year limitation period from the date of knowledge of negligence.";
    } else if (lowerQuery.includes('intellectual') || lowerQuery.includes('copyright')) {
        return "Intellectual property disputes involve copyright, trademark, patent, and design infringement. These are handled by District Courts and High Courts. IP disputes have different limitation periods: copyright (3 years), trademark (3 years), patent (3 years).";
    } else if (lowerQuery.includes('cyber') || lowerQuery.includes('online')) {
        return "Cyber crime disputes involve online fraud, data theft, and cyber harassment. These are handled by Cyber Crime Cells and Special Courts. Cyber crime cases have a 3-year limitation period from the date of knowledge of the offense.";
    } else {
        return "I'd be happy to help! Could you provide more specific details about your legal or business question? For example, what type of business are you starting, or what specific legal issue are you facing?";
    }
}

// Modal functionality
function openCaseModal(caseType) {
    const modal = document.getElementById('caseModal');
    const content = document.getElementById('caseModalContent');
    
    const caseInfo = getCaseInfo(caseType);
    content.innerHTML = `
        <h2>${caseInfo.title}</h2>
        <div class="case-details">
            <h3>Overview</h3>
            <p>${caseInfo.overview}</p>
            
            <h3>Legal Remedies</h3>
            <ul>
                ${caseInfo.remedies.map(remedy => `<li>${remedy}</li>`).join('')}
            </ul>
            
            <h3>Timeline</h3>
            <p>${caseInfo.timeline}</p>
            
            <h3>Jurisdiction</h3>
            <p>${caseInfo.jurisdiction}</p>
            
            <h3>Required Documents</h3>
            <ul>
                ${caseInfo.documents.map(doc => `<li>${doc}</li>`).join('')}
            </ul>
            
            <h3>Important Limitations</h3>
            <p>${caseInfo.limitations}</p>
            
            <h3>Legal Terms Glossary</h3>
            <div class="glossary">
                ${caseInfo.glossary.map(term => `
                    <div class="glossary-item">
                        <strong>${term.term}:</strong> ${term.definition}
                    </div>
                `).join('')}
            </div>
            
            <div class="disclaimer">
                <strong>Disclaimer:</strong> This information is for general guidance only. Please consult a qualified legal professional for your specific case.
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function openStateModal(state) {
    const modal = document.getElementById('stateModal');
    const content = document.getElementById('stateModalContent');
    
    const stateInfo = getStateInfo(state);
    content.innerHTML = `
        <h2>Business Licenses in ${stateInfo.name}</h2>
        <div class="state-details">
            <h3>Common Licenses Required</h3>
            ${stateInfo.licenses.map(license => `
                <div class="license-card">
                    <h4>${license.name}</h4>
                    <p><strong>Authority:</strong> ${license.authority}</p>
                    <p><strong>Requirements:</strong> ${license.requirements}</p>
                    <p><strong>Fees:</strong> ${license.fees}</p>
                </div>
            `).join('')}
            
            <h3>Application Process</h3>
            <ol>
                ${stateInfo.process.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h3>State-Specific Notes</h3>
            <p>${stateInfo.notes}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const caseModal = document.getElementById('caseModal');
    const stateModal = document.getElementById('stateModal');
    
    if (event.target === caseModal) {
        caseModal.style.display = 'none';
    }
    if (event.target === stateModal) {
        stateModal.style.display = 'none';
    }
}

// Get case information
function getCaseInfo(caseType) {
    const cases = {
        'landlord-tenant': {
            title: 'Landlord-Tenant Disputes',
            overview: 'Disputes between landlords and tenants typically involve security deposits, rent payments, property maintenance, and eviction procedures. These are governed by state-specific rent control laws and the Transfer of Property Act, 1882.',
            remedies: [
                'Recovery of security deposit with interest',
                'Compensation for wrongful eviction',
                'Rent control and fair rent determination',
                'Specific performance of rental agreement terms',
                'Injunction against illegal eviction'
            ],
            timeline: 'Cases typically take 6 months to 2 years to resolve, depending on court workload and case complexity.',
            jurisdiction: 'Rent Control Courts, Civil Courts, or Consumer Forums depending on the nature of dispute and state laws.',
            documents: [
                'Rental agreement or lease deed',
                'Payment receipts and bank statements',
                'Property inspection reports',
                'Photographs of property condition',
                'Correspondence with landlord/tenant',
                'Property registration documents'
            ],
            limitations: 'Most landlord-tenant disputes have a 3-year limitation period. However, some states have specific time limits for rent control matters.',
            glossary: [
                { term: 'Security Deposit', definition: 'Money paid by tenant to landlord as security against damages' },
                { term: 'Rent Control', definition: 'Legal restrictions on rent increases and eviction procedures' },
                { term: 'Eviction', definition: 'Legal process to remove tenant from property' },
                { term: 'Fair Rent', definition: 'Reasonable rent determined by rent control authorities' }
            ]
        },
        'consumer-rights': {
            title: 'Consumer Rights Disputes',
            overview: 'Consumer disputes arise when consumers face issues with products or services. These are handled under the Consumer Protection Act, 2019, which provides for consumer forums at district, state, and national levels.',
            remedies: [
                'Refund of amount paid',
                'Replacement of defective product',
                'Compensation for mental agony and harassment',
                'Punitive damages for unfair trade practices',
                'Injunction against unfair trade practices'
            ],
            timeline: 'Consumer complaints are typically resolved within 3-6 months at district level, 6-12 months at state level.',
            jurisdiction: 'District Consumer Disputes Redressal Commission, State Consumer Disputes Redressal Commission, National Consumer Disputes Redressal Commission.',
            documents: [
                'Purchase receipt or invoice',
                'Product warranty documents',
                'Correspondence with seller/manufacturer',
                'Photographs of defective product',
                'Expert opinion reports',
                'Medical reports (for injury cases)'
            ],
            limitations: 'Consumer complaints must be filed within 2 years from the date of cause of action. No court fees for claims up to ₹1 lakh.',
            glossary: [
                { term: 'Defect', definition: 'Any fault, imperfection, or shortcoming in quality, quantity, or standard' },
                { term: 'Deficiency', definition: 'Any fault, imperfection, or shortcoming in quality, nature, or manner of service' },
                { term: 'Unfair Trade Practice', definition: 'Any trade practice that causes loss or injury to consumers' },
                { term: 'Consumer', definition: 'Person who buys goods or avails services for personal use' }
            ]
        },
        'employment-labor': {
            title: 'Employment & Labor Disputes',
            overview: 'Employment disputes involve issues between employers and employees including wage disputes, wrongful termination, workplace harassment, and labor law violations. These are governed by various labor laws including the Industrial Disputes Act, 1947.',
            remedies: [
                'Reinstatement with back wages',
                'Compensation for wrongful termination',
                'Payment of pending wages and benefits',
                'Compensation for workplace harassment',
                'Injunction against unfair labor practices'
            ],
            timeline: 'Labor disputes typically take 6 months to 3 years to resolve, depending on the complexity and court workload.',
            jurisdiction: 'Labor Courts, Industrial Tribunals, High Courts, and Supreme Court for appeals.',
            documents: [
                'Employment contract or appointment letter',
                'Salary slips and payment records',
                'Termination letter or notice',
                'Witness statements and evidence',
                'Company policies and procedures',
                'Medical certificates (if applicable)'
            ],
            limitations: 'Most employment disputes have a 3-year limitation period from the date of cause of action.',
            glossary: [
                { term: 'Wrongful Termination', definition: 'Termination of employment without valid reason or proper procedure' },
                { term: 'Back Wages', definition: 'Wages due from the date of termination to reinstatement' },
                { term: 'Retrenchment', definition: 'Termination of employment due to business reasons' },
                { term: 'Industrial Dispute', definition: 'Dispute between employer and employees regarding employment terms' }
            ]
        },
        'family-law': {
            title: 'Family Law Disputes',
            overview: 'Family law disputes involve matters related to marriage, divorce, custody, maintenance, and domestic violence. These are governed by various personal laws and the Protection of Women from Domestic Violence Act, 2005.',
            remedies: [
                'Divorce decree and alimony',
                'Child custody and visitation rights',
                'Maintenance and financial support',
                'Protection orders against domestic violence',
                'Property division and settlement'
            ],
            timeline: 'Family law cases can take 1-5 years to resolve, depending on complexity and cooperation between parties.',
            jurisdiction: 'Family Courts, District Courts, High Courts, and Supreme Court for appeals.',
            documents: [
                'Marriage certificate or proof of marriage',
                'Birth certificates of children',
                'Financial documents and income proof',
                'Medical reports (if applicable)',
                'Witness statements',
                'Property documents'
            ],
            limitations: 'Most family law matters have a 3-year limitation period, but some have longer periods.',
            glossary: [
                { term: 'Alimony', definition: 'Financial support paid by one spouse to another after divorce' },
                { term: 'Custody', definition: 'Legal right to care for and make decisions about a child' },
                { term: 'Maintenance', definition: 'Financial support for spouse or children' },
                { term: 'Domestic Violence', definition: 'Physical, emotional, or economic abuse within the family' }
            ]
        },
        'criminal-law': {
            title: 'Criminal Law Matters',
            overview: 'Criminal law matters involve offenses against the state and society. These are governed by the Indian Penal Code, 1860, and various other criminal laws. Legal aid is available for those who cannot afford legal representation.',
            remedies: [
                'Bail and anticipatory bail',
                'Legal representation and defense',
                'Appeal against conviction',
                'Compensation for wrongful arrest',
                'Protection from harassment'
            ],
            timeline: 'Criminal cases can take 2-10 years to resolve, depending on the severity and complexity of the offense.',
            jurisdiction: 'Magistrate Courts, Sessions Courts, High Courts, and Supreme Court.',
            documents: [
                'FIR (First Information Report)',
                'Bail application and surety documents',
                'Medical reports (if applicable)',
                'Witness statements',
                'Police investigation reports',
                'Legal aid application (if applicable)'
            ],
            limitations: 'Criminal cases have different limitation periods depending on the offense. Some serious offenses have no limitation period.',
            glossary: [
                { term: 'FIR', definition: 'First Information Report filed with police about a crime' },
                { term: 'Bail', definition: 'Release of accused person on security pending trial' },
                { term: 'Anticipatory Bail', definition: 'Bail granted before arrest to prevent harassment' },
                { term: 'Legal Aid', definition: 'Free legal assistance provided to those who cannot afford lawyers' }
            ]
        },
        'banking-finance': {
            title: 'Banking & Finance Disputes',
            overview: 'Banking and finance disputes involve issues with banks, financial institutions, loans, credit cards, and financial services. These are governed by banking laws and consumer protection laws.',
            remedies: [
                'Refund of unauthorized charges',
                'Correction of credit reports',
                'Compensation for banking errors',
                'Loan restructuring and relief',
                'Injunction against harassment'
            ],
            timeline: 'Banking disputes typically take 3-12 months to resolve through banking ombudsman or consumer forums.',
            jurisdiction: 'Banking Ombudsman, Consumer Forums, High Courts, and Supreme Court.',
            documents: [
                'Bank statements and transaction records',
                'Loan agreements and documents',
                'Credit card statements',
                'Correspondence with bank',
                'Identity and address proof',
                'Income documents'
            ],
            limitations: 'Banking disputes have a 3-year limitation period from the date of cause of action.',
            glossary: [
                { term: 'Banking Ombudsman', definition: 'Quasi-judicial authority for resolving banking disputes' },
                { term: 'Credit Report', definition: 'Record of credit history and payment behavior' },
                { term: 'Loan Restructuring', definition: 'Modification of loan terms to help borrowers' },
                { term: 'Unauthorized Transaction', definition: 'Transaction not authorized by the account holder' }
            ]
        },
        'motor-vehicle': {
            title: 'Motor Vehicle Disputes',
            overview: 'Motor vehicle disputes involve accidents, insurance claims, traffic violations, and vehicle-related issues. These are governed by the Motor Vehicles Act, 1988, and insurance laws.',
            remedies: [
                'Compensation for accident injuries',
                'Vehicle repair or replacement',
                'Insurance claim settlement',
                'Traffic violation appeals',
                'License suspension appeals'
            ],
            timeline: 'Motor vehicle disputes typically take 6 months to 2 years to resolve, depending on complexity.',
            jurisdiction: 'Motor Accidents Claims Tribunal, Traffic Courts, High Courts, and Supreme Court.',
            documents: [
                'Vehicle registration and insurance documents',
                'Police report and FIR',
                'Medical reports and bills',
                'Witness statements',
                'Photographs of accident scene',
                'Repair estimates and bills'
            ],
            limitations: 'Motor vehicle accident claims have a 3-year limitation period from the date of accident.',
            glossary: [
                { term: 'MACT', definition: 'Motor Accidents Claims Tribunal for accident compensation' },
                { term: 'No Fault Liability', definition: 'Liability regardless of who caused the accident' },
                { term: 'Third Party Insurance', definition: 'Insurance covering damage to third parties' },
                { term: 'Hit and Run', definition: 'Accident where driver leaves without providing information' }
            ]
        },
        'medical-negligence': {
            title: 'Medical Negligence Cases',
            overview: 'Medical negligence cases involve claims against healthcare providers for substandard care resulting in injury or death. These are governed by medical negligence laws and consumer protection laws.',
            remedies: [
                'Compensation for medical expenses',
                'Compensation for pain and suffering',
                'Compensation for loss of income',
                'Punitive damages for gross negligence',
                'Injunction against negligent practices'
            ],
            timeline: 'Medical negligence cases typically take 2-5 years to resolve due to complexity and expert evidence required.',
            jurisdiction: 'Consumer Forums, Civil Courts, High Courts, and Supreme Court.',
            documents: [
                'Medical records and reports',
                'Expert medical opinions',
                'Hospital bills and expenses',
                'Photographs of injuries',
                'Witness statements',
                'Death certificate (if applicable)'
            ],
            limitations: 'Medical negligence cases have a 3-year limitation period from the date of knowledge of negligence.',
            glossary: [
                { term: 'Medical Negligence', definition: 'Failure to provide proper medical care resulting in harm' },
                { term: 'Informed Consent', definition: 'Patient agreement to treatment after being informed of risks' },
                { term: 'Standard of Care', definition: 'Level of care expected from a reasonable medical professional' },
                { term: 'Causation', definition: 'Proof that negligence caused the injury or death' }
            ]
        },
        'intellectual-property': {
            title: 'Intellectual Property Disputes',
            overview: 'Intellectual property disputes involve copyright, trademark, patent, and design infringement cases. These are governed by various IP laws including the Copyright Act, 1957, and Trademarks Act, 1999.',
            remedies: [
                'Injunction against infringement',
                'Damages and compensation',
                'Destruction of infringing goods',
                'Account of profits',
                'Costs and legal fees'
            ],
            timeline: 'IP disputes typically take 1-3 years to resolve, depending on complexity and court workload.',
            jurisdiction: 'District Courts, High Courts, and Supreme Court for appeals.',
            documents: [
                'IP registration certificates',
                'Evidence of infringement',
                'Financial records and profits',
                'Expert opinions',
                'Correspondence with infringer',
                'Market research and surveys'
            ],
            limitations: 'IP disputes have different limitation periods: copyright (3 years), trademark (3 years), patent (3 years).',
            glossary: [
                { term: 'Copyright', definition: 'Exclusive right to reproduce and distribute creative works' },
                { term: 'Trademark', definition: 'Distinctive sign identifying goods or services' },
                { term: 'Patent', definition: 'Exclusive right to manufacture and sell an invention' },
                { term: 'Infringement', definition: 'Unauthorized use of intellectual property rights' }
            ]
        },
        'cyber-crimes': {
            title: 'Cyber Crime Disputes',
            overview: 'Cyber crime disputes involve online fraud, data theft, cyber harassment, and other internet-related offenses. These are governed by the Information Technology Act, 2000, and related laws.',
            remedies: [
                'Compensation for financial loss',
                'Injunction against cyber harassment',
                'Data recovery and restoration',
                'Criminal prosecution of offenders',
                'Protection orders and restraining orders'
            ],
            timeline: 'Cyber crime cases typically take 6 months to 2 years to resolve, depending on complexity and investigation.',
            jurisdiction: 'Cyber Crime Cells, Special Courts, High Courts, and Supreme Court.',
            documents: [
                'Screenshots and digital evidence',
                'Bank statements and transaction records',
                'Email and communication records',
                'Technical expert reports',
                'Police complaint and FIR',
                'Identity and address proof'
            ],
            limitations: 'Cyber crime cases have a 3-year limitation period from the date of knowledge of the offense.',
            glossary: [
                { term: 'Cyber Crime', definition: 'Criminal activity involving computers and internet' },
                { term: 'Data Theft', definition: 'Unauthorized access and theft of digital information' },
                { term: 'Phishing', definition: 'Fraudulent attempt to obtain sensitive information' },
                { term: 'Cyber Harassment', definition: 'Use of electronic communication to harass or threaten' }
            ]
        }
    };
    
    return cases[caseType] || cases['landlord-tenant'];
}

// Get state information
function getStateInfo(state) {
    const states = {
        'delhi': {
            name: 'Delhi',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation of Delhi (MCD)',
                    requirements: 'Property documents, NOC from fire department, health clearance',
                    fees: '₹1000-5000 annually'
                },
                {
                    name: 'Shops & Establishments Registration',
                    authority: 'Labour Department, Delhi',
                    requirements: 'Business registration, employee details, address proof',
                    fees: '₹500-2000'
                }
            ],
            process: [
                'Identify required licenses based on business type',
                'Gather necessary documents and clearances',
                'Apply online through respective portals or offline at offices',
                'Pay required fees',
                'Await inspection and approval',
                'Collect license certificates'
            ],
            notes: 'Delhi has specific requirements for certain businesses. Food businesses need FSSAI license, beauty parlours need health department clearance, and all businesses need to comply with Delhi Pollution Control Committee norms.'
        },
        'mumbai': {
            name: 'Maharashtra',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Brihanmumbai Municipal Corporation (BMC)',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹2000-8000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Maharashtra State Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Maharashtra has streamlined online processes for most licenses. Food businesses need FSSAI license and health department clearance. Manufacturing units need pollution control board clearance.'
        },
        'bangalore': {
            name: 'Karnataka',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Bruhat Bengaluru Mahanagara Palike (BBMP)',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1500-6000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Karnataka Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Karnataka has a single window clearance system for many licenses. IT businesses can benefit from special incentives and faster processing.'
        },
        'chennai': {
            name: 'Tamil Nadu',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Greater Chennai Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-5000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Tamil Nadu Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Tamil Nadu offers various incentives for manufacturing and IT businesses. Special economic zones provide additional benefits.'
        },
        'gujarat': {
            name: 'Gujarat',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-4000 annually'
                },
                {
                    name: 'GST Registration',
                    authority: 'Central Board of Indirect Taxes and Customs',
                    requirements: 'PAN, Aadhaar, business address proof',
                    fees: 'No fees'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Gujarat is known for its business-friendly policies and fast processing. Special incentives are available for manufacturing and export businesses.'
        },
        'rajasthan': {
            name: 'Rajasthan',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹800-3000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Rajasthan Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Rajasthan offers various incentives for tourism, handicrafts, and manufacturing businesses. Special economic zones provide additional benefits.'
        },
        'punjab': {
            name: 'Punjab',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-4000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Punjab Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Punjab offers various incentives for agriculture, manufacturing, and IT businesses. Special focus on renewable energy and food processing.'
        },
        'kerala': {
            name: 'Kerala',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-4000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Kerala Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Kerala has a strong focus on sustainable development and environmental compliance. Special incentives for tourism and IT businesses.'
        },
        'uttar-pradesh': {
            name: 'Uttar Pradesh',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹800-3000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Uttar Pradesh Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Uttar Pradesh offers various incentives for manufacturing, IT, and agriculture businesses. Special economic zones provide additional benefits.'
        },
        'west-bengal': {
            name: 'West Bengal',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-4000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'West Bengal Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'West Bengal offers various incentives for manufacturing, IT, and tourism businesses. Special focus on MSME development.'
        },
        'andhra-pradesh': {
            name: 'Andhra Pradesh',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Municipal Corporation',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1000-4000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Andhra Pradesh Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Andhra Pradesh offers various incentives for manufacturing, IT, and agriculture businesses. Special economic zones provide additional benefits.'
        },
        'telangana': {
            name: 'Telangana',
            licenses: [
                {
                    name: 'Trade License',
                    authority: 'Greater Hyderabad Municipal Corporation (GHMC)',
                    requirements: 'Property documents, fire NOC, health clearance',
                    fees: '₹1500-6000 annually'
                },
                {
                    name: 'Professional Tax Registration',
                    authority: 'Telangana Commercial Tax Department',
                    requirements: 'Business registration, employee details',
                    fees: '₹200-500 per employee'
                }
            ],
            process: [
                'Check specific requirements for your business type',
                'Obtain necessary NOCs and clearances',
                'Apply through online portals or visit offices',
                'Complete payment of fees',
                'Submit for inspection',
                'Receive license after approval'
            ],
            notes: 'Telangana is known for its IT-friendly policies and fast processing. Special incentives for IT, manufacturing, and agriculture businesses.'
        }
    };
    
    return states[state] || states['delhi'];
}

// Add smooth scrolling animation
function addScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    });
    
    document.querySelectorAll('.category-card, .license-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', addScrollAnimation);
