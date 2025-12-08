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
  // By default, Docusaurus generates a sidebar from the docs folder structure
   streamsSidebar: [
      //
      // 01. INTRODUCTION (pas de sous-menu)
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
      // 03. CONFIGURATION
      //
      {
        type: 'category',
        label: 'Configuration',
        collapsed: false,
        items: [
          // docs de niveau 1
          'streams/Configuration/Overview/overview',
          'streams/Configuration/Connections/connections',
          'streams/Configuration/Scope/scope',

          // sous-catégorie Streams
          {
            type: 'category',
            label: 'Streams',
            collapsed: true,
            items: [
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Streams-Design-Overview/stream-design-overview',
                label: 'Streams Design Overview',
              },
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Columns-Section/columns-section',
                label: 'Columns Section',
              },
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Lookups/lookups',
                label: 'Lookups',
              },
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Conditions/conditions',
                label: 'Conditions',
              },
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Create-Operations/create-operations',
                label: 'Create Operations',
              },
              {
                type: 'doc',
                id: 'streams/Configuration/Streams/Update-Operations/update-operations',
                label: 'Update Operations',
              },
            ],
          },
        ],
      },

      //
      // 04. GLOSSARY
      //
      {
        type: 'doc',
        id: 'streams/Glossary/glossary',
        label: 'Glossary',
      },

      //
      // 05. TROUBLESHOOTING
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
