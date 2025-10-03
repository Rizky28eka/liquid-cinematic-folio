import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [
    {name: 'projectInfo', title: 'Project Info', options: {collapsible: true, collapsed: false}},
    {name: 'projectDetails', title: 'Project Details', options: {collapsible: true, collapsed: true}},
    {name: 'caseStudy', title: 'Case Study', options: {collapsible: true, collapsed: true}},
    {name: 'technicalDetails', title: 'Technical Details', options: {collapsible: true, collapsed: true}},
    {name: 'projectManagement', title: 'Project Management', options: {collapsible: true, collapsed: true}},
    {name: 'marketingAndVisibility', title: 'Marketing & Visibility', options: {collapsible: true, collapsed: true}},
    {name: 'userExperience', title: 'User Experience', options: {collapsible: true, collapsed: true}},
    {name: 'businessImpact', title: 'Business Impact', options: {collapsible: true, collapsed: true}},
    {name: 'securityAndCompliance', title: 'Security & Compliance', options: {collapsible: true, collapsed: true}},
    {name: 'futurePlans', title: 'Future Plans', options: {collapsible: true, collapsed: true}},
    {name: 'teamAndCollaboration', title: 'Team & Collaboration', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      fieldset: 'projectInfo',
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title.en',
            maxLength: 96,
        },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      fieldset: 'projectInfo',
    }),
    defineField({
        name: 'longDescription',
        title: 'Long Description',
        type: 'localeText',
        fieldset: 'projectInfo',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fieldset: 'projectInfo',
    }),
    defineField({
        name: 'gallery',
        title: 'Gallery',
        type: 'array',
        of: [{type: 'image'}],
        fieldset: 'projectInfo',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'projectInfo',
    }),
    defineField({
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
            list: [
                {title: 'Website', value: 'website'},
                {title: 'Mobile', value: 'mobile'},
                {title: 'AI', value: 'ai'},
                {title: 'Design', value: 'design'},
            ],
        },
        fieldset: 'projectInfo',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      fieldset: 'projectInfo',
    }),
    defineField({
        name: 'date',
        title: 'Date',
        type: 'datetime',
        fieldset: 'projectDetails',
    }),
    defineField({
        name: 'duration',
        title: 'Duration',
        type: 'localeString',
        fieldset: 'projectDetails',
    }),
    defineField({
        name: 'client',
        title: 'Client',
        type: 'string',
        fieldset: 'projectDetails',
    }),
    defineField({
        name: 'status',
        title: 'Status',
        type: 'localeString',
        fieldset: 'projectDetails',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      fieldset: 'projectDetails',
    }),
    defineField({
        name: 'githubUrl',
        title: 'GitHub URL',
        type: 'url',
        fieldset: 'projectDetails',
    }),
    defineField({
        name: 'projectGoals',
        title: 'Project Goals',
        type: 'localeText',
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'lessonsLearned',
        title: 'Lessons Learned',
        type: 'localeText',
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'targetAudience',
        title: 'Target Audience',
        type: 'localeText',
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'competitorAnalysis',
        title: 'Competitor Analysis',
        type: 'localeText',
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'designInspirations',
        title: 'Design Inspirations',
        type: 'array',
        of: [{type: 'image'}],
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'colorPalette',
        title: 'Color Palette',
        type: 'array',
        of: [{type: 'string'}],
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'typography',
        title: 'Typography',
        type: 'object',
        fields: [
            {name: 'fontFamily', type: 'string', title: 'Font Family'},
            {name: 'fontWeight', type: 'string', title: 'Font Weight'},
        ],
        fieldset: 'caseStudy',
    }),
    defineField({
        name: 'features',
        title: 'Features',
        type: 'array',
        of: [{type: 'localeString'}],
        fieldset: 'technicalDetails',
    }),
    defineField({
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'name', type: 'string', title: 'Name'},
                {name: 'role', type: 'localeString', title: 'Role'},
                {name: 'description', type: 'localeText', title: 'Description'},
            ]
        }],
        fieldset: 'technicalDetails',
    }),
    defineField({
        name: 'challenges',
        title: 'Challenges',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'challenge', type: 'localeString', title: 'Challenge'},
                {name: 'solution', type: 'localeText', title: 'Solution'},
            ]
        }],
        fieldset: 'technicalDetails',
    }),
    defineField({
        name: 'codeSnippets',
        title: 'Code Snippets',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'language', type: 'string', title: 'Language'},
                {name: 'code', type: 'text', title: 'Code'},
            ]
        }],
        fieldset: 'technicalDetails',
    }),
    defineField({
        name: 'projectTimeline',
        title: 'Project Timeline',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'milestone', type: 'localeString', title: 'Milestone'},
                {name: 'date', type: 'date', title: 'Date'},
            ]
        }],
        fieldset: 'projectManagement',
    }),
    defineField({
        name: 'relatedProjects',
        title: 'Related Projects',
        type: 'array',
        of: [{type: 'reference', to: {type: 'project'}}],
        fieldset: 'projectManagement',
    }),
    defineField({
        name: 'testimonial',
        title: 'Testimonial',
        type: 'object',
        fields: [
            {name: 'content', type: 'localeText', title: 'Content'},
            {name: 'author', type: 'string', title: 'Author'},
            {name: 'role', type: 'localeString', title: 'Role'},
        ],
        fieldset: 'projectManagement',
    }),
    defineField({
        name: 'seoKeywords',
        title: 'SEO Keywords',
        type: 'array',
        of: [{type: 'localeString'}],
        fieldset: 'marketingAndVisibility',
    }),
    defineField({
        name: 'socialMediaPosts',
        title: 'Social Media Posts',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'platform', type: 'string', title: 'Platform'},
                {name: 'content', type: 'localeText', title: 'Content'},
                {name: 'link', type: 'url', title: 'Link'},
            ]
        }],
        fieldset: 'marketingAndVisibility',
    }),
    defineField({
        name: 'pressMentions',
        title: 'Press Mentions',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'publication', type: 'string', title: 'Publication'},
                {name: 'title', type: 'localeString', title: 'Title'},
                {name: 'link', type: 'url', title: 'Link'},
            ]
        }],
        fieldset: 'marketingAndVisibility',
    }),
    defineField({
        name: 'awardsAndRecognition',
        title: 'Awards & Recognition',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'award', type: 'localeString', title: 'Award'},
                {name: 'organization', type: 'string', title: 'Organization'},
                {name: 'date', type: 'date', title: 'Date'},
            ]
        }],
        fieldset: 'marketingAndVisibility',
    }),
    defineField({
        name: 'userFlow',
        title: 'User Flow',
        type: 'image',
        fieldset: 'userExperience',
    }),
    defineField({
        name: 'wireframes',
        title: 'Wireframes',
        type: 'array',
        of: [{type: 'image'}],
        fieldset: 'userExperience',
    }),
    defineField({
        name: 'prototypes',
        title: 'Prototypes',
        type: 'url',
        fieldset: 'userExperience',
    }),
    defineField({
        name: 'accessibilityNotes',
        title: 'Accessibility Notes',
        type: 'localeText',
        fieldset: 'userExperience',
    }),
    defineField({
        name: 'feedbackAndReviews',
        title: 'Feedback & Reviews',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'source', type: 'string', title: 'Source'},
                {name: 'quote', type: 'localeText', title: 'Quote'},
                {name: 'author', type: 'string', title: 'Author'},
            ]
        }],
        fieldset: 'userExperience',
    }),
    defineField({
        name: 'kpis',
        title: 'KPIs (Key Performance Indicators)',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'indicator', type: 'localeString', title: 'Indicator'},
                {name: 'value', type: 'string', title: 'Value'},
            ]
        }],
        fieldset: 'businessImpact',
    }),
    defineField({
        name: 'roi',
        title: 'ROI (Return on Investment)',
        type: 'localeText',
        fieldset: 'businessImpact',
    }),
    defineField({
        name: 'businessValue',
        title: 'Business Value',
        type: 'localeText',
        fieldset: 'businessImpact',
    }),
    defineField({
        name: 'scalability',
        title: 'Scalability',
        type: 'localeText',
        fieldset: 'businessImpact',
    }),
    defineField({
        name: 'authentication',
        title: 'Authentication',
        type: 'localeText',
        fieldset: 'securityAndCompliance',
    }),
    defineField({
        name: 'dataProtection',
        title: 'Data Protection',
        type: 'localeText',
        fieldset: 'securityAndCompliance',
    }),
    defineField({
        name: 'regulations',
        title: 'Regulations',
        type: 'array',
        of: [{type: 'string'}],
        fieldset: 'securityAndCompliance',
    }),
    defineField({
        name: 'roadmap',
        title: 'Roadmap',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'quarter', type: 'string', title: 'Quarter'},
                {name: 'features', type: 'array', of: [{type: 'localeString'}]},
            ]
        }],
        fieldset: 'futurePlans',
    }),
    defineField({
        name: 'plannedFeatures',
        title: 'Planned Features',
        type: 'array',
        of: [{type: 'localeString'}],
        fieldset: 'futurePlans',
    }),
    defineField({
        name: 'maintenanceStrategy',
        title: 'Maintenance Strategy',
        type: 'localeText',
        fieldset: 'futurePlans',
    }),
    defineField({
        name: 'teamMembers',
        title: 'Team Members',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'name', type: 'string', title: 'Name'},
                {name: 'role', type: 'localeString', title: 'Role'},
                {name: 'contribution', type: 'localeText', title: 'Contribution'},
            ]
        }],
        fieldset: 'teamAndCollaboration',
    }),
    defineField({
        name: 'contributors',
        title: 'Contributors',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'name', type: 'string', title: 'Name'},
                {name: 'githubProfile', type: 'url', title: 'GitHub Profile'},
            ]
        }],
        fieldset: 'teamAndCollaboration',
    }),
    defineField({
        name: 'toolsUsed',
        title: 'Tools Used',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'name', type: 'string', title: 'Name'},
                {name: 'category', type: 'string', title: 'Category'},
            ]
        }],
        fieldset: 'teamAndCollaboration',
    }),
  ],
})

