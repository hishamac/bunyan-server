import { ForbiddenException } from '@nestjs/common';

export async function buildAuthorizationFilter(
  user: any,
  filters?: any,
): Promise<any> {
  const { role, districtId, zoneId, villageId, mahalluId } = user;
  const baseFilter = filters || {};

  switch (role) {
    case 'SuperAdmin':
      // SuperAdmin has access to all events
      return baseFilter;

    case 'DistrictAdmin':
      // Filter events by Mahallu within the district (indirect relationship via Zone and Village)
      const districtMahallus = await this.prisma.mahallu.findMany({
        where: {
          village: {
            zone: {
              districtId
            },
          },
        },
        select: { id: true },
      });
      return {
        ...baseFilter,
        mahalluId: { in: districtMahallus.map((mahallu) => mahallu.id) },
      };

    case 'ZoneAdmin':
      // Filter events by Mahallu within the zone (indirect relationship via Village)
      const zoneMahallus = await this.prisma.mahallu.findMany({
        where: {
          village: {
            zoneId,
          },
        },
        select: { id: true },
      });
      return {
        ...baseFilter,
        mahalluId: { in: zoneMahallus.map((mahallu) => mahallu.id) },
      };

    case 'VillageAdmin':
      // Filter events by Mahallu within the specific village
      const villageMahallus = await this.prisma.mahallu.findMany({
        where: {
          villageId,
        },
        select: { id: true },
      });
      return {
        ...baseFilter,
        mahalluId: { in: villageMahallus.map((mahallu) => mahallu.id) },
      };

    case 'MahalAdmin':
      // Filter events created by the specific MahalAdmin
      return {
        ...baseFilter,
        mahalluId: mahalluId,
        active: false, // Only unverified events
      };

    default:
      throw new ForbiddenException('User role not authorized to view events.');
  }
}
