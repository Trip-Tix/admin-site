import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

interface ExpandableIconProps {
  expandedContent: React.ReactNode;
}

const ExpandableIcon: React.FC<ExpandableIconProps> = ({ expandedContent }: ExpandableIconProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      {expanded ? (
        <Box>
          {expandedContent}
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={toggleExpand}
            size="sm"
            mt={2}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            aria-label="Expand"
            icon={<AddIcon />}
            onClick={toggleExpand}
            size="sm"
          />
        </Box>
      )}
    </Box>
  );
};

export default ExpandableIcon;
