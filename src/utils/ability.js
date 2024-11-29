import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function defineAbilityFor(roles) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (roles.includes("Manager")) {
    can("view", "all"); // Manager 可以查看所有頁面
  } else {
    if (roles.includes("Examer")) {
      can("view", "ExamManagement");
    }
    if (roles.includes("Examplacer")) {
      can("view", "ExamPlaceManagement");
    }
    if (roles.includes("Examiner")) {
      can("view", "ExamineeManagement");
    }
  }
  can("view", "Home");
  cannot("view", "undefined"); // 預防未定義的頁面
  return build();
}
