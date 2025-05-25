import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchField() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="아이디 검색" className="text-white" />
      <Button
        variant="secondary"
        type="submit"
        onClick={() => alert("기능 사용 불가")}
      >
        검색
      </Button>
    </div>
  );
}
