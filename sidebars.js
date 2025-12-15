// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  streamsSidebar: [
    //
    // 01. INTRODUCTION
    //
    {
      type: 'doc',
      id: 'streams/Introduction/intro',
      label: 'Introduction',
    },

    //
    // 02. INSTALLATION
    //
    {
      type: 'category',
      label: 'Installation',
      collapsed: false,
      items: [
        'streams/Installation/Requirements/requirements',
        'streams/Installation/Quick-Start/quick-start',
      ],
    },

    //
    // 03. ENVIRONMENT
    //
    {
      type: 'category',
      label: 'Environment',
      collapsed: false,
      items: [
        // docs de niveau 1
        'streams/Environment/Overview/overview',
        'streams/Environment/Glossary/glossary',

        // sous-catégorie Project
        {
          type: 'category',
          label: 'Project',
          collapsed: false,
          items: [
            'streams/Environment/Project/Connections/connections',
            'streams/Environment/Project/Scope/scope',
            'streams/Environment/Project/Output-Config/output-config',

            // sous-catégorie Streams
            {
              type: 'category',
              label: 'Streams',
              collapsed: true,
              items: [
                // attention : cet id n’a PAS le dossier "Streams" dans le chemin
                'streams/Environment/Project/Streams-Design-Overview/stream-design-overview',

                'streams/Environment/Project/Streams/Columns-Section/columns-section',
                'streams/Environment/Project/Streams/Conditions/conditions',
                'streams/Environment/Project/Streams/Content/Formulas/formulas',
                'streams/Environment/Project/Streams/Create-Operations/create-operations',
                'streams/Environment/Project/Streams/Update-Operations/update-operations',
                'streams/Environment/Project/Streams/Aggregate/aggregate',
                'streams/Environment/Project/Streams/Lookups/lookups',
              ],
            },
          ],
        },
      ],
    },

    //
    // 04. TROUBLESHOOTING
    //
    {
      type: 'doc',
      id: 'streams/Troubleshooting/troubleshooting',
      label: 'Troubleshooting',
    },
  ],

  streams2Sidebar: [
    {
      type: 'category',
      label: '01. Getting Started',
      collapsed: false,
      items: [
        'streams2/getting-started/overview',
        'streams2/getting-started/installation',
        'streams2/getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: '02. Core Concepts',
      collapsed: false,
      items: [
        'streams2/core-concepts/architecture',
        'streams2/core-concepts/projects',
        'streams2/core-concepts/connections',
        'streams2/core-concepts/scopes',
        'streams2/core-concepts/streams',
        'streams2/core-concepts/models',
      ],
    },
    {
      type: 'category',
      label: '03. Configuration',
      collapsed: true,
      items: [
        'streams2/configuration/environment',
        'streams2/configuration/target-database',
        'streams2/configuration/project-config',
        'streams2/configuration/variants',
      ],
    },
    {
      type: 'category',
      label: '04. Stream Design',
      collapsed: true,
      items: [
        'streams2/stream-design/overview',
        'streams2/stream-design/columns',
        'streams2/stream-design/create-operations',
        'streams2/stream-design/update-operations',
        'streams2/stream-design/formulas',
        'streams2/stream-design/aggregations',
      ],
    },
    {
      type: 'category',
      label: '05. Data Governance',
      collapsed: true,
      items: [
        'streams2/data-governance/glossary',
        'streams2/data-governance/validation-rules',
      ],
    },
    {
      type: 'category',
      label: '06. Reference',
      collapsed: true,
      items: [
        'streams2/reference/connection-types',
        'streams2/reference/content-types',
        'streams2/reference/field-types',
        'streams2/reference/create-connector',
      ],
    },
    {
      type: 'category',
      label: '07. Examples',
      collapsed: true,
      items: [
        'streams2/examples/example-excel-to-couchbase',
        'streams2/examples/example-database-join',
        'streams2/examples/example-formulas',
      ],
    },
  ],


  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
