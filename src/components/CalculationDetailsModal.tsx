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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { CloseIcon, TrashIcon, EditIcon, SaveIcon, XIcon } from "./ActionIcons";

interface Outlet {
  id: string;
  name: string;
  address: string;
  campaign: string;
}

interface Article {
  id: string;
  name: string;
  description: string;
  pieces: string;
  boxes: string;
  bottles: string;
  amount: string;
}

interface CalculationDetail {
  id: string;
  creationDate: string;
  placeId: string;
  outlet: Outlet;
  articles: Article[];
  notes?: string;
}

interface CalculationDetailsModalProps {
  calculation: CalculationDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
  onSave: (calculationData: CalculationDetail) => void;
}

export function CalculationDetailsModal({ 
  calculation, 
  open, 
  onOpenChange, 
  onDelete,
  onSave 
}: CalculationDetailsModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedArticles, setEditedArticles] = useState<Article[]>([]);
  const [editedNotes, setEditedNotes] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!open || !calculation) return null;

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedArticles([...calculation.articles]);
    setEditedNotes(calculation.notes || "");
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedArticles([]);
    setEditedNotes("");
  };

  const handleSaveChanges = () => {
    const updatedCalculation: CalculationDetail = {
      ...calculation,
      articles: editedArticles,
      notes: editedNotes
    };

    setShowSuccess(true);
    setTimeout(() => {
      onSave(updatedCalculation);
      setIsEditMode(false);
      setShowSuccess(false);
    }, 1500);
  };

  const handleArticleChange = (id: string, field: keyof Article, value: string) => {
    setEditedArticles(editedArticles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    ));
  };

  const handleDeleteConfirm = () => {
    onDelete(calculation.id);
    setShowDeleteDialog(false);
    onOpenChange(false);
  };

  const calculateTotals = (articles: Article[]) => {
    return articles.reduce((totals, article) => ({
      pieces: totals.pieces + (parseInt(article.pieces) || 0),
      boxes: totals.boxes + (parseInt(article.boxes) || 0),
      bottles: totals.bottles + (parseInt(article.bottles) || 0),
      amount: totals.amount + (parseFloat(article.amount) || 0)
    }), { pieces: 0, boxes: 0, bottles: 0, amount: 0 });
  };

  const displayArticles = isEditMode ? editedArticles : calculation.articles;
  const totals = calculateTotals(displayArticles);

  // Error state
  if (hasError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white border border-gray-200 rounded-2xl w-[900px] p-16 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load calculation details</h3>
            <p className="text-gray-600 mb-6">
              There was a problem loading the data. Please try again.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setHasError(false)}
                className="bg-[#FDD42B] hover:opacity-90 text-gray-900 rounded-full h-11 px-8 shadow-lg font-semibold"
              >
                Retry
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="border border-gray-300 hover:bg-gray-50 rounded-lg h-11 px-6"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white border border-gray-200 rounded-2xl w-[1000px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Calculation Details</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>ID: {calculation.id}</span>
                  <span>•</span>
                  <span>Created: {calculation.creationDate}</span>
                  <span>•</span>
                  <span>Outlet: {calculation.outlet.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEditMode && (
                  <>
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 hover:bg-gray-50 rounded-lg h-9 px-4"
                    >
                      <EditIcon className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteDialog(true)}
                      variant="outline"
                      size="sm"
                      className="border border-red-300 text-red-600 hover:bg-red-50 rounded-lg h-9 px-4"
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Summary Section */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Created On</p>
                  <p className="text-gray-900 font-medium">{calculation.creationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Place ID</p>
                  <p className="text-gray-900 font-medium">{calculation.placeId}</p>
                </div>
              </div>

              {/* Articles Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Articles</h3>
                <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 bg-gray-50">
                        <TableHead className="text-gray-900 font-medium w-[150px]">Article Name</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[200px]">Description</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[90px]">Pieces</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[90px]">Boxes</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[90px]">Bottles</TableHead>
                        <TableHead className="text-gray-900 font-medium w-[100px]">Amount</TableHead>
                        {isEditMode && <TableHead className="text-gray-900 font-medium w-[100px]">Actions</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayArticles.map((article) => (
                        <TableRow key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <TableCell>
                            {isEditMode ? (
                              <Select
                                value={article.name}
                                onValueChange={(value) => handleArticleChange(article.id, "name", value)}
                              >
                                <SelectTrigger className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="APEROL SPRITZ LIGHT WALL SIGN 2019">APEROL SPRITZ LIGHT WALL SIGN 2019</SelectItem>
                                  <SelectItem value="APEROL SPRITZ PILLOW SET">APEROL SPRITZ PILLOW SET</SelectItem>
                                  <SelectItem value="APEROL SPRITZ BOT-GLASSGLORIFIER">APEROL SPRITZ BOT-GLASSGLORIFIER</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="text-gray-900 capitalize">{article.name}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditMode ? (
                              <Input
                                value={article.description}
                                onChange={(e) => handleArticleChange(article.id, "description", e.target.value)}
                                className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            ) : (
                              <span className="text-gray-600">{article.description}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditMode ? (
                              <Input
                                type="number"
                                value={article.pieces}
                                onChange={(e) => handleArticleChange(article.id, "pieces", e.target.value)}
                                className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            ) : (
                              <span className="text-gray-900">{article.pieces}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditMode ? (
                              <Input
                                type="number"
                                value={article.boxes}
                                onChange={(e) => handleArticleChange(article.id, "boxes", e.target.value)}
                                className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            ) : (
                              <span className="text-gray-900">{article.boxes}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditMode ? (
                              <Input
                                type="number"
                                value={article.bottles}
                                onChange={(e) => handleArticleChange(article.id, "bottles", e.target.value)}
                                className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            ) : (
                              <span className="text-gray-900">{article.bottles}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditMode ? (
                              <Input
                                type="number"
                                step="0.01"
                                value={article.amount}
                                onChange={(e) => handleArticleChange(article.id, "amount", e.target.value)}
                                className="border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                              />
                            ) : (
                              <span className="text-gray-900">{article.amount}</span>
                            )}
                          </TableCell>
                          {isEditMode && (
                            <TableCell>
                              <div className="flex gap-1">
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Save row"
                                >
                                  <SaveIcon className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Cancel"
                                >
                                  <XIcon className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow className="border-t border-gray-200 bg-gray-50">
                        <TableCell className="text-gray-900 font-semibold" colSpan={2}>Totals</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.pieces}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.boxes}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.bottles}</TableCell>
                        <TableCell className="text-gray-900 font-semibold">{totals.amount.toFixed(2)}</TableCell>
                        {isEditMode && <TableCell></TableCell>}
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>

              {/* Notes Section */}
              {(calculation.notes || isEditMode) && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                  {isEditMode ? (
                    <Textarea
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      placeholder="Add internal notes or comments..."
                      className="border border-gray-300 rounded-lg min-h-[100px] resize-none focus:ring-2 focus:ring-[#FDD42B] focus:border-[#FDD42B]"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[100px]">
                      {calculation.notes || "No notes added."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => isEditMode ? handleCancelEdit() : onOpenChange(false)}
                variant="outline"
                className="border border-gray-300 hover:bg-gray-50 rounded-lg h-11 px-6"
              >
                {isEditMode ? "Cancel" : "Close"}
              </Button>
              {isEditMode && (
                <Button
                  onClick={handleSaveChanges}
                  className="bg-[#FDD42B] hover:opacity-90 text-gray-900 rounded-full h-11 px-8 shadow-lg font-semibold"
                >
                  Save Changes
                </Button>
              )}
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-700 font-medium">✓ Changes saved successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white border border-gray-200 shadow-2xl rounded-2xl max-w-md">
          <AlertDialogHeader>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="w-6 h-6 text-red-500" />
            </div>
            <AlertDialogTitle className="text-gray-900 text-xl font-semibold text-center">Delete Calculation</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-center">
              Are you sure you want to delete calculation {calculation.id}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
            <AlertDialogCancel className="mt-0 flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg h-11">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg h-11 shadow-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}