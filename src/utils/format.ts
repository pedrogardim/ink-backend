import { Request } from "express";
import { User } from "../models/User";

export const getBaseUrl = (req: Request) =>
  req.protocol + "://" + req.get("host") + "/api";

export const getReqUrl = (req: Request) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

export const formatUser = (user: User, req: Request) => ({
  kind: "user",
  self: `${getBaseUrl(req)}/users/${user.id}`,
  ...user,
  password: undefined,
});

type FormatPaginationArguments = {
  req: Request;
  page: number;
  pageSize: number;
  totalItems: number;
  items: any[];
};

export const formatPaginationResponse = ({
  req,
  page,
  pageSize,
  totalItems,
  items,
}: FormatPaginationArguments) => ({
  data: {
    kind: (items[0] || {}).kind,
    currentItemCount: items.length,
    itemsPerPage: pageSize,
    startIndex: (page - 1) * pageSize + 1,
    totalItems,
    self: getReqUrl(req),
    next:
      page === Math.ceil(totalItems / pageSize)
        ? undefined
        : getReqUrl(req).replace(`page=${page}`, `page=${page + 1}`),
    previous:
      page === 1
        ? undefined
        : getReqUrl(req).replace(`page=${page}`, `page=${page - 1}`),
    pageIndex: page,
    totalPages: Math.ceil(totalItems / pageSize),
    items: items.map((u) => ({ ...u, kind: undefined })),
  },
});
