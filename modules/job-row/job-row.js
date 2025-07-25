class JobRowComponent {
  constructor() {
    this.template = null;
    this.loadTemplate();
  }

  async loadTemplate() {
    try {
      const response = await fetch('modules/job-row/job-row.html');
      this.template = await response.text();
    } catch (error) {
      console.error('Failed to load job row template:', error);
    }
  }

  render(jobData) {
    if (!this.template) {
      console.error('Template not loaded yet');
      return '';
    }

    let html = this.template;
    
    // Replace placeholders with actual data
    const replacements = {
      '{jobType}': jobData.jobType,
      '{jobIcon}': jobData.jobIcon,
      '{jobName}': jobData.jobName,
      '{count}': jobData.count || 0,
      '{toolName}': jobData.toolName,
      '{toolIcon}': jobData.toolIcon,
      '{toolLevel}': jobData.toolLevel || 1,
      '{toolCost}': jobData.toolCost || 50
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      html = html.replace(new RegExp(placeholder, 'g'), value);
    });

    return html;
  }

  // Helper method to create job data objects
  static createJobData(jobType, jobIcon, jobName, toolName, toolIcon, count = 0, toolLevel = 1, toolCost = 50) {
    return {
      jobType,
      jobIcon,
      jobName,
      count,
      toolName,
      toolIcon,
      toolLevel,
      toolCost
    };
  }
}

// Make it globally available
window.JobRowComponent = JobRowComponent; 