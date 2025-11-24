import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CloseIcon, PlusIcon, TrashIcon } from "./ActionIcons";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface Article {
  id: string;
  name: string;
  pieces: string;
  boxes: string;
  bottles: string;
  amount: string;
}

interface NewCalculationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outlets: Outlet[];
  onSave: (data: any) => void;
}

export function NewCalculationModal({
  open,
  onOpenChange,
  outlets,
  onSave
}: NewCalculationModalProps) {
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [notes, setNotes] = useState("");
  const [articles, setArticles] = useState<Article[]>([
    { id: "1", name: "", pieces: "", boxes: "", bottles: "", amount: "" }
  ]);

  const articleOptions = [
    "APEROL SPRITZ LIGHT WALL SIGN 2019",
    "APEROL SPRITZ PILLOW SET",
    "APEROL SPRITZ BOT-GLASSGLORIFIER"
  ];

  const updateArticle = (id: string, field: keyof Article, value: string) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    ));
  };

  const removeArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const calculateTotals = () => {
    return articles.reduce((totals, article) => ({
      pieces: totals.pieces + (parseInt(article.pieces) || 0),
      boxes: totals.boxes + (parseInt(article.boxes) || 0),
      bottles: totals.bottles + (parseInt(article.bottles) || 0),
      amount: totals.amount + (parseFloat(article.amount) || 0)
    }), { pieces: 0, boxes: 0, bottles: 0, amount: 0 });
  };

  const totals = calculateTotals();

  const handleSave = () => {
    const calculationData = {
      outlet: selectedOutlet,
      placeId,
      articles,
      notes
    };
    onSave(calculationData);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-[900px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">New Calculation</h2>
              <p className="text-gray-600">Create a new calculation for one of your outlets.</p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!outlets.length ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-gray-400 text-2xl">📦</span>
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">No outlets available</h3>
              <p className="text-gray-600 max-w-md">
                Please create an outlet before adding a new calculation.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 1: Outlet Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select Outlet <span className="text-red-500">*</span>
                </label>
                <Select 
                  value={selectedOutlet} 
                  onValueChange={setSelectedOutlet}
                  disabled={!outlets.length}
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg h-11 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                    <SelectValue placeholder="Choose an outlet..." />
                  </SelectTrigger>
                  <SelectContent>
                    {outlets.map((outlet) => (
                      <SelectItem key={outlet.id} value={outlet.id}>
                        {outlet.name} - {outlet.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-2">
                  You need at least one outlet to create a calculation.
                </p>
              </div>

              {/* Step 2: Articles Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-900">
                    Articles <span className="text-red-500">*</span>
                  </label>
                  <Button
                    onClick={() => {
                      const newArticle: Article = {
                        id: Date.now().toString(),
                        name: "",
                        pieces: "",
                        boxes: "",
                        bottles: "",
                        amount: ""
                      };
                      setArticles([...articles, newArticle]);
                    }}
                    variant="outline"
                    size="sm"
                    className="border border-gray-300 hover:bg-gray-50 rounded-lg h-9"
                    disabled={!selectedOutlet}
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Row
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 bg-gray-50">
                        <TableHead className="text-gray-900 font-medium w-[200px]">Article Name</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[100px]">Pieces</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[100px]">Boxes</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[100px]">Bottles</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[120px]">Amount</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[60px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <TableCell>
                            <Select
                              value={article.name}
                              onValueChange={(value) => updateArticle(article.id, "name", value)}
                              disabled={!selectedOutlet}
                            >
                              <SelectTrigger className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                                <SelectValue placeholder="Select article..." />
                              </SelectTrigger>
                              <SelectContent>
                                {articleOptions.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={article.pieces}
                              onChange={(e) => updateArticle(article.id, "pieces", e.target.value)}
                              placeholder="0"
                              className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              disabled={!selectedOutlet}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={article.boxes}
                              onChange={(e) => updateArticle(article.id, "boxes", e.target.value)}
                              placeholder="0"
                              className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              disabled={!selectedOutlet}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={article.bottles}
                              onChange={(e) => updateArticle(article.id, "bottles", e.target.value)}
                              placeholder="0"
                              className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              disabled={!selectedOutlet}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.01"
                              value={article.amount}
                              onChange={(e) => updateArticle(article.id, "amount", e.target.value)}
                              placeholder="0.00"
                              className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              disabled={!selectedOutlet}
                            />
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeArticle(article.id)}
                              disabled={articles.length === 1 || !selectedOutlet}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <TrashIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow className="border-t border-gray-200 bg-gray-50">
                        <TableCell className="text-gray-900 font-semibold">Totals</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.pieces}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.boxes}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.bottles}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.amount.toFixed(2)}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>

              {/* Step 3: Notes Section */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Notes <span className="text-gray-500">(optional)</span>
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes or comments..."
                  className="border border-gray-300 rounded-lg min-h-[100px] resize-none focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                  disabled={!selectedOutlet}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border border-gray-300 hover:bg-gray-50 rounded-lg h-11 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selectedOutlet || !outlets.length}
              className="bg-[#FDD42B] hover:opacity-90 text-gray-900 rounded-[8px] h-11 px-8 shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Calculation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}