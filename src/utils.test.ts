import { IPointType } from "./types";
import {
  getPointIndex,
  getPointValues,
  getTotalPoints,
  updatePointType
} from "./utils";

describe("utils", () => {
  const fakePoints: IPointType[] = [
    {
      key: "military-points",
      svg: "military-svg-look-at-me",
      value: 0
    },
    {
      key: "treasury-points",
      svg: "coin-svg-look-at-me",
      value: 0
    },
    {
      key: "wonders-points",
      svg: "wonders-svg-look-at-me",
      value: 0
    },
    {
      key: "civilian-points",
      svg: "civilian-svg-look-at-me",
      value: 0
    },
    {
      key: "commercial-points",
      svg: "commercial-svg-look-at-me",
      value: 0
    },
    {
      key: "guilds-points",
      svg: "guild-svg-look-at-me",
      value: 0
    },
    {
      key: "science-points",
      svg: "science-svg-look-at-me",
      value: 0
    }
  ];

  describe("getPointIndex", () => {
    it("gets a point's index by key", () => {
      const index = getPointIndex(fakePoints, "military-points");
      expect(index).toEqual(0);
    });
  });

  describe("getPointValues", () => {
    it("gets points values", () => {
      const result = getPointValues([{ value: 1 }, { value: 2 }, { value: 3 }]);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("updatePointType", () => {
    it("updates a points types", () => {
      const newValue = 4815162342;
      const scienceIndex = getPointIndex(fakePoints, "science-points");

      const newPoints = updatePointType(
        {
          key: "science-points",
          svg: "science-svg-look-at-me",
          value: newValue
        },
        fakePoints
      );

      expect(newPoints[scienceIndex].value).toEqual(newValue);
    });
  });

  describe("getTotalPoints", () => {
    it("sums point values ", () => {
      const total = getTotalPoints([{ value: 1 }, { value: 2 }, { value: 3 }]);
      expect(total).toEqual(6);
    });
  });
});
