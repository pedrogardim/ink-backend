import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { TattooWork } from "../models/TattooWork";

export const BASE_URL = process.env.BASE_URL as string;

export const formatAuthentication = (token: string, user: User) => ({
  kind: "authentication",
  token,
  tokenIat: new Date(),
  tokenExp: new Date(Date.now() + 1000 * 60 * 60),
  user: formatUser(user),
});

export const formatUser = (user: User) => ({
  kind: "user",
  self: `${BASE_URL}/users/${user.id}`,
  ...user,
  password: undefined,
});

export const formatAppointment = (appointment: Appointment) => ({
  kind: "appointment",
  self: `${BASE_URL}/appointments/${appointment.id}`,
  ...appointment,
  client: appointment.client ? formatUser(appointment.client) : undefined,
  tattooist: appointment.tattooist
    ? formatUser(appointment.tattooist)
    : undefined,
});

export const formatTattooWork = (tattooWork: TattooWork, req: any) => ({
  kind: "tattooWork",
  self: `${BASE_URL}/tattooWorks/${tattooWork.id}`,
  ...tattooWork,
  tattooist: tattooWork.tattooist
    ? formatUser(tattooWork.tattooist)
    : undefined,
});

type FormatPaginationArguments = {
  req?: any;
  page: number;
  pageSize: number;
  totalItems: number;
  items: any[];
  routePrefix?: string;
};

export const formatPaginationResponse = ({
  page,
  pageSize,
  totalItems,
  items,
  routePrefix,
}: FormatPaginationArguments) => ({
  data: {
    kind: (items[0] || {}).kind,
    currentItemCount: items.length,
    itemsPerPage: pageSize,
    startIndex: (page - 1) * pageSize + 1,
    totalItems,
    self: BASE_URL + routePrefix + "?page=" + page,
    next:
      page === Math.ceil(totalItems / pageSize)
        ? undefined
        : BASE_URL + routePrefix + "?page=" + (page + 1),
    previous:
      page === 1 ? undefined : BASE_URL + routePrefix + "?page=" + (page - 1),
    pageIndex: page,
    totalPages: Math.ceil(totalItems / pageSize),
    items: items.map((u) => ({ ...u, kind: undefined })),
  },
});
