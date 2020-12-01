import React from 'react';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';

export default function PredefinedSection({
  section,
  onSectionChange,
}) {
  if (!section.format) return null;

  if (section.format === 'header') return <HeaderSection section={section} onSectionChange={onSectionChange} />
  if (section.format === 'footer') return <FooterSection section={section} onSectionChange={onSectionChange} />

  return null;
}
