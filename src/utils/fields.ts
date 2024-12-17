export const extractRelations = (
    fields: string[],
    allowedRelations: string[],
  ): string[] => {
    const relationsSet = new Set<string>();
  
    fields.forEach((field) => {
      if (field.includes('.')) {
        const lastIndex = field.lastIndexOf('.');
        const relation = field.slice(0, lastIndex);
        if (allowedRelations.includes(relation)) {
          relationsSet.add(relation);
        }
      }
    });
  
    return Array.from(relationsSet);
  };
  